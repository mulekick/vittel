// global jest options
export default {
    verbose: true,
    transform: {
        "\\.[jt]sx?$": `babel-jest`
    },
    // transform packages that provide only ESM exports (important)
    transformIgnorePatterns: [ `/node_modules/(?!(jose)/)` ],
    // rewrite module imports for symlinked monorepo packages
    moduleNameMapper: {
        "^@vittel\\/([^/]+)$": `<rootDir>/../../node_modules/@vittel/$1/dist/$1.js`,
        "^@vittel\\/([^/]+)\\/([^/]+)$": `<rootDir>/../../node_modules/@vittel/$1/dist/$2.js`
    }
};