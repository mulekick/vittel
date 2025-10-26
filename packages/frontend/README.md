# <center>`@vittel/frontend`</center>

Example react app.

## Package structure

```bash
@vittel/frontend/
├── .env.files/              # dotenv config files
├── .vscode/                 # vscode debug config
├── dist/                    # build directory
├── docs/                    # typedoc output directory
├── src/                     # react app source code
│   ├── app/
│   │   ├── *.tsx            # react components
│   │   ├── *.ts             # plain typescript files
│   │   └── *.test.ts        # react components test files
│   ├── public/
│   │   └── *.*              # vite static serving directory
│   ├── scss/
│   │   └── *.scss           # react app scss files
│   ├── static/
│   │   └── *.*              # assets included in the build
│   ├── index.html           # main html page (rollup entrypoint)
│   └── stub.test.ts         # stub unit test file
├── .browserslistrc          # browserslist queries for building
├── babel.config.js          # local babel config
├── jest.config.js           # local jest config
├── package.json             # react app dependencies and tasks
├── postcss.config.js        # postcss config file
├── tsconfig.json            # local tsconfig
├── typedoc.config.js        # local typedoc config
└── vite.config.js           # vite config file
```

## Specific CI/CD tasks

- `dev`: starts the `vite` server in dev mode and is independant of the CI/CD pipeline.
- `build`: builds the package into `src/dist` using `vite` (`NODE_ENV` defaults to production).
- `publish`: copies the app build to its eventual static serving location before the image building tasks runs.

## Required shell variables for [`package.json`](./package.json) scripts

| variable      | usage                                                                      |
|---------------|----------------------------------------------------------------------------|
| `NODE_ENV`    | Run vite in development or production mode                                 |
| `SERVING_DIR` | Path to which publish the build directory, will be overwritten if existing |

- _The value for each variable must be consistent across all scripts._

## Published assets

- A self-sufficient bundle for the app is created in `src/dist` at build time.
- As a result, app dependencies can be installed as dev dependencies.
- `VITE_*` variables from `.env.production` are included in the bundle.

## Notes

- Frontend design choices used here (`vite`, `react`, `scss`, etc..) are just my own and can be changed to yours.
- The node app build serves the react app, thus `SERVING_DIR` is set to a static serving directory in package [`@vittel/backend`](../backend/README.md).
- In a real world scenario, the react app build would be published elsewhere to be served by a [reverse proxy](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/delegatetoproxy.md).
- `src/stub.test.ts` should not be removed so the `test` task does not fail if no other test files exist.
- Run `npx lerna run docs:build` to build the [docs](./docs/README.md) for all packages for details about specific modules.