import TextlintTester from "textlint-tester";
import rule from "../src/write-good";

const tester = new TextlintTester();

tester.run("write-good", rule, {
    valid: [
        "Hello, world!",
        "This sentence contains no mistakes.",
        {
            text: "The cat was stolen.",
            options: {
                passive: false
            }
        }
    ],
    invalid: [
        {
            text: "So the cat was stolen.",
            errors: [
                {
                    message: '"So" adds no meaning',
                    line: 1,
                    column: 1
                },
                {
                    message: '"was stolen" may be passive voice',
                    line: 1,
                    column: 12
                }
            ]
        }
    ]
});
