# <center>`@vittel/e2e`</center>

End to end tests suite.

## Package structure

```bash
@vittel/e2e/
├── .vscode/                 # vscode debug config
├── src/                     # e2e package source code
│   ├── *.test.ts            # end-to-end test files
│   └── stub.test.ts         # stub unit test file
├── babel.config.js          # local babel config
├── jest-puppeteer.config.js # jest-puppeteer config file
├── jest.config.js           # local jest config
├── package.json             # e2e package dependencies and tasks
└── tsconfig.json            # local tsconfig
```

## Specific CI/CD tasks

- `build`: does not build anything but required for CI/CD orchestration, do not remove.
- `docker:build`: does not build anything but required for CI/CD orchestration, do not remove.

## Required shell variables for [`package.json`](./package.json) scripts

| variable      | usage                                      |
|---------------|--------------------------------------------|
| `ENV_DIR`     | Directory for `dotenv` config files        |
| `NODE_ENV`    | Run node in development or production mode |

- _The value for each variable must be consistent across all scripts._

## Published assets

- None.

## Notes

- Caution : **_ALL_** monorepo packages have to be included as dependencies, except other e2e packages.
- This is mandatory for the CI/CD pipeline to fail if any build asset fails to validate end-to-end tests.
- `ENV_DIR` and `NODE_ENV` point to the production config file of [`@vittel/backend`](../backend/README.md).
- Additional variables for `dotenv` configs may be added if the tests involve multiple node based services.
- `NODE_ENV` should always be set to `production` since end to end tests run against production builds.
- `src/stub.test.ts` should not be removed so the `test` task does not fail if no other test files exist.
- Since the `jest` syntax conflicts with the `typedoc` syntax, e2e packages cannot be documented at all.