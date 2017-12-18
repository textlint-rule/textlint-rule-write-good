import { RuleHelper } from 'textlint-rule-helper';
import writeGood from 'write-good';

function reporter(context, options = {}) {
  const { Syntax, getSource, report, RuleError } = context;
  const helper = new RuleHelper(context);

  return {
    [Syntax.Str](node) {
      if (helper.isChildNode(node, [Syntax.BlockQuote])) {
        return;
      }

      const text = getSource(node);
      const suggestions = writeGood(text, options);

      suggestions.forEach((suggestion) => {
        const { index, reason: message } = suggestion;

        report(node, new RuleError(message, { index }));
      });
    },
  };
}

export default {
  linter: reporter,
  fixer: reporter,
};
