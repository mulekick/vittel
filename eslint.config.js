// global eslint options
import muleslint from "@mulekick/eslint-config-muleslint";
import typescript from "typescript-eslint";

export default typescript.config(...muleslint, {
    rules: {
        'new-cap': `off`,
        'n/file-extension-in-import': `off`,
        'n/no-process-env': `off`,
        'n/no-extraneous-import': `off`,
        'n/no-unpublished-import': `off`,
        'import/no-unresolved': `off`
    }
}, {
    ignores: [ `**/node_modules/**`, `**/dist/**`, `**/build/**` ]
});