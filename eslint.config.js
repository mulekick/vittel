import muleslint from "@mulekick/eslint-config-muleslint";
import {defineConfig} from "eslint/config";

// .eslintignore doesn't work with flat configs
export default defineConfig(...muleslint, {
    rules: {
        "n/no-extraneous-import": `off`,
        "n/no-unpublished-import": `off`,
        "import/no-unresolved": `off`
    }
}, {
    ignores: [ `**/node_modules/**`, `**/dist/**`, `**/build/**` ]
});