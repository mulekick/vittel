# <center>`@vittel/utils`</center>

Shared utilities and functions.

## Package structure

```bash
@vittel/utils/
├── dist/                    # build directory
├── docs/                    # typedoc output directory
├── src/                     # npm package source code
│   ├── common.ts            # shared node.js and browser compatible code
│   ├── errors.ts            # shared node.js specific error-related code
│   ├── mocks.ts             # database client and message queue client mocks
│   ├── stub.test.ts         # stub unit test file
│   └── utils.ts             # shared node.js specific helper code
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

- Module `src/utils.ts` is exported as `@vittel/utils`.
- Module `src/errors.ts` is exported as `@vittel/utils/errors`.
- Module `src/common.ts` is exported as `@vittel/utils/common`.
- Module `src/mocks.ts` is exported as `@vittel/utils/mocks`.
- The local `tar` archive is published to `../vittel-utils-<version>.tgz`.

## Notes

- the `mocks` modules and exports exist for demonstration purposes and can be removed once real clients are used.
- `src/stub.test.ts` should not be removed so the `test` task does not fail if no other test files exist.
- Run `npx lerna run docs:build` to build the [docs](./docs/README.md) for all packages for details about specific modules.