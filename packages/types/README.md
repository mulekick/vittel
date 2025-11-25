# <center>`@vittel/types`</center>

Shared types, enums & parsers.

## Package structure

```bash
@vittel/types/
├── dist/                    # build directory
├── docs/                    # typedoc output directory
├── src/                     # npm package source code
│   ├── enums.ts             # shared typescript enums
│   ├── parsers.ts           # shared zod parsers
│   ├── stub.test.ts         # stub unit test file
│   └── types.ts             # shared type declarations
├── .npmignore               # npm exclusion file
├── babel.config.js          # local babel config
├── jest.config.js           # local jest config
├── package.json             # npm package dependencies and tasks
├── tsconfig.json            # local tsconfig
└── typedoc.config.js        # local typedoc config
```

## Specific CI/CD tasks

- `types:build`: automatically creates required types declaration files.
- `build`: builds the package into `src/dist` using `esbuild`.
- `publish`: bundles the package into a local `tar` archive.
- The above eliminates the need for an external npm registry.

## Required shell variables for [`package.json`](./package.json) scripts

| variable      | usage                                                             |
|---------------|-------------------------------------------------------------------|
| `ENTRYPOINTS` | List of typescript implementation files, supports shell expansion |

- _The value for each variable must be consistent across all scripts._

## Published assets

- Module `src/types.ts` is exported as `@vittel/types`.
- Module `src/enums.ts` is exported as `@vittel/types/enums`.
- Module `src/parsers.ts` is exported as `@vittel/types/parsers`.
- The local `tar` archive is published to `../vittel-types-<version>.tgz`.

## Notes

- `src/stub.test.ts` should not be removed so the `test` task does not fail if no other test files exist.
- Run `npx lerna run docs:build` to build the [docs](./docs/README.md) for all packages for details about specific modules.