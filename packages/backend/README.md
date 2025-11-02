# <center>`@vittel/backend`</center>

Example node.js server app.

## Package structure

```bash
@vittel/backend/
├── .env.files/              # dotenv config files
├── .vscode/                 # vscode debug config
├── dist/                    # build directory
├── docs/                    # typedoc output directory
├── src/                     # node app source code
│   ├── controller/
│   │   ├── middlewares/
│   │   │   ├── defaults.ts  # default middleware
│   │   │   ├── *.ts         # server API middlewares
│   │   │   └── *.test.ts    # server unit test files
│   │   └── routes/
│   │       ├── routes.ts    # main express router
│   │       └── *.ts         # server API routers
│   ├── data/
│   │   └── *.ts             # data access features
│   ├── domain/
│   │   ├── helpers/
│   │   │   └── *.ts         # feature-agnostic code
│   │   └── transactions/
│   │       └── *.ts         # feature-specific code
│   ├── config.ts            # node app config file
│   ├── server.ts            # node app main file
│   └── stub.test.ts         # stub unit test file
├── babel.config.js          # local babel config
├── Dockerfile               # Dockerfile for building the image
├── jest.config.js           # local jest config
├── nodemon.json             # nodemon config file
├── package.json             # node app dependencies and tasks
├── tsconfig.json            # local tsconfig
└── typedoc.config.js        # local typedoc config
```

## Specific CI/CD tasks

- `dev`: starts the node.js app in dev mode using `tsx` and is independant of the CI/CD pipeline.
- `build`: builds the package into `src/dist` using `esbuild`.
- `prod`: starts the app build in prod mode using `node`, and is independant of the CI/CD pipeline.
- `docker:lockfile`: copies the monorepo lockfile to the package directory, required for docker image building.
- `docker:build`: builds and tags the docker image using the package's `Dockerfile`.
- `docker:push`: pushes the image to the [docker registry](../../docker.registry) configured for the monorepo.

## Published assets

- Once `npx lerna run docker:build` executes successfully, a docker image for the app is created.
- For the required dependencies to be included, `Dockerfile` has to observe the following :
  1. `lerna` writes the monorepo packages locations as symlinks to the global `package-lock.json`.
  2. `npm ci` cannot follow symlinks, so monorepo packages must be copied to the image's `node_modules`.
  3. This is done by extracting local `tar` archives at build time to overwrite symlinked packages.
  4. This pattern is illustrated in the default [`Dockerfile`](./Dockerfile).
  5. Each monorepo npm package included as a dependency here needs to be extracted that way.
  6. To do so, add the `tar` archive name and relevant symlink path to the `PACKAGES` array.

## Required shell variables for [`package.json`](./package.json) scripts

| variable      | usage                                                |
|---------------|------------------------------------------------------|
| `ENV_DIR`     | Directory for `dotenv` config files                  |
| `NODE_ENV`    | Run node in development or production mode           |
| `ENTRYPOINTS` | Entry point for `esbuild`, defaults to main app file |
| `SERVICE`     | Service name to use for the current package          |
| `BUILD_IMG`   | Docker image full tag                                |

- _The value for each variable must be consistent across all scripts (except for `NODE_ENV`)._

## Notes

- Backend design choices used here (`express`, `busboy`, `jose`, etc..) are just my own and can be changed to yours.
- The node app build serves the react app, thus package [`@vittel/frontend`](../frontend/README.md) is included as a dependency.
- In a real world scenario, the react app build would be published elsewhere to be served by a [reverse proxy](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/delegatetoproxy.md).
- `src/controller/middlewares` also stores non HTTP based middlewares ([message queues](./src/controller/middlewares/subscriber.ts) etc) that access the server API. 
- Example implementations of [data streams](./src/domain/classes/uploader.ts) and [event emitters](./src/domain/classes/emitter.ts) usage in the domain layer are available.
- `src/stub.test.ts` should not be removed so the `test` task does not fail if no other test files exist.
- Run `npx lerna run docs:build` to build the [docs](./docs/README.md) for all packages for details about specific modules.