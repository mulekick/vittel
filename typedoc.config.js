// global typedoc options
export default {
    readme: `none`,
    entryPoints: [ `./src` ],
    entryPointStrategy: `expand`,
    alwaysCreateEntryPointModule: true,
    cleanOutputDir: true,
    exclude: [ `**/*.test.ts` ],
    excludeNotDocumented: false,
    // important ...
    excludeExternals: true,
    jsDocCompatibility: false,
    basePath: `./`,
    outputs: [ {
        name: `markdown`,
        path: `./docs`
    } ],
    plugin: [ `typedoc-plugin-missing-exports`, `typedoc-plugin-markdown`, `typedoc-plugin-remark` ],
    // typedoc-plugin-missing-exports specific
    placeInternalsInOwningModule: true,
    // typedoc-plugin-markdown specific
    outputFileStrategy: `modules`,
    expandObjects: true,
    useCodeBlocks: true,
    indexFormat: `table`,
    parametersFormat: `table`,
    interfacePropertiesFormat: `table`,
    classPropertiesFormat: `table`,
    enumMembersFormat: `table`,
    propertyMembersFormat: `table`,
    typeDeclarationFormat: `table`,
    sort: [
        `source-order`
    ],
    // skip type checking
    skipErrorChecking: true,
    // TOC
    remarkPlugins: [ {
        applyTo: `*`,
        plugins: [
            [ `remark-insert-headings`, {
                text: `Table of contents`,
                position: `start`,
                minHeadingCount: 2
            } ],
            [ `remark-toc`, {
                ordered: false,
                tight: true,
                maxDepth: 2
            } ]
        ]
    } ]
};