# <center>Vittel</center>

#### <center>Full-stack monorepo starter kit for [service oriented](https://en.wikipedia.org/wiki/Service-oriented_architecture) typescript apps</center>

### Table of contents

1. [Design goals](#design-goals)
2. [Packages types](#packages-types)
3. [Prerequisites](#prerequisites)
4. [Scaffold your project](#scaffold-your-project)
5. [Project structure](#project-structure)
6. [Tasks by package type](#tasks-by-package-type)
7. [Dependencies management](#dependencies-management)
8. [Features](#features)
9. [Footnotes](#footnotes)

## Design goals

- Write node.js services that follow the [**_3 tier architecture pattern_**](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/createlayers.md).
- Write node.js services that follow the [**_best practices for production apps_**](https://github.com/goldbergyoni/nodebestpractices/tree/master?tab=readme-ov-file#table-of-contents).
- Configure a tooling suite for the entire monorepo (settings are overriden at package level).
- Provide features scaling capabilities through [**_code sharing_**](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) and [**_type driven development_**](https://www.olioapps.com/blog/type-driven-development-with-typescript).
- Provide capabilities for unit testing with `jest` and end-to-end testing with `puppeteer`.
- Provide capabilities for **_services containerization_** with `Dockerfile` and `docker buildx`.
- Configure a **_fully local_** CI/CD pipeline orchestrated by `nx` for quick iterations and secure deliveries.

## Packages types

- The monorepo manages interdependent **_packages_** to implement a full service oriented app.
- Different types of packages can be created for complementary purposes :

1. **Npm packages** :
    - Code that has to be shared / reused across the app.
    - CI/CD pipeline builds the package into an npm module for use in other packages.
    - [`@vittel/types`](packages/types/README.md) and [`@vittel/utils`](packages/utils/README.md) are included as templates.
2. **Node.js packages** :
    - Code for a server app that executes in a node.js environment.
    - Supports different configs for development and production mode.
    - CI/CD pipeline builds the package into a docker image ready for deployment.
    - [`@vittel/backend`](packages/backend/README.md) is included as template.
3. **Frontend packages** :
    - Code for a browser app that is statically served by another service (node.js or external).
    - Supports different configs for development and production mode.
    - CI/CD pipeline builds the package and publishes it to a static serving location.
    - [`@vittel/frontend`](packages/frontend/README.md) is included as template.
4. **E2e packages** :
    - Code for end-to-end tests, not part of the app itself.
    - End-to-end tests support browser automation with `puppeteer` and `jest`.
    - CI/CD pipeline will error (thus alert) should any of those tests fail.
    - [`@vittel/e2e`](packages/e2e/README.md) is included as template.
5. **External packages** :
    - Non-typescript services required for app operation or e2e tests (databases, proxies, message queues, etc).
    - Such services usually contain only configuration assets and optionally a `Dockerfile`.
    - CI/CD pipeline builds the package into a docker image if needed.

_Note : the npm `types` package should always be present to allow centralized management of types across the monorepo._

## Prerequisites

| <center>software</center>  | <center>recommended version</center> |
|----------------------------|--------------------------------------|
| Linux                      | Debian 12 bookworm                   |
| GNU Bash                   | `5.2.15`                             |
| Node.js                    | `22.15.0`                            |
| NPM                        | `10.9.2`                             |
| Docker                     | `28.3.3`                             |
| docker-buildx-plugin       | `0.26.1`                             |
| Puppeteer browser          | google chrome / puppeteer defaults   |

## Scaffold your project

- Use the following commands to scaffold a new project :

```bash
# clone the repository using degit
npx degit https://github.com/mulekick/vittel.git my-vittel-project

# cd into your project
cd my-vittel-project

# initialize monorepo and install dependencies
npm run deps:install

# run the initial build to make types available
npx lerna run build
```

## Project structure

```bash
my-vittel-project/
├── .nx/               # nx cache
├── packages/          # workspace packages
│   ├── backend/       # sample server app
│   ├── frontend/      # sample browser app
│   ├── types/         # shared types, parsers and enums
│   ├── utils/         # shared utilities
│   └── e2e/           # end to end tests
├── babel.config.js    # global babel config (transpiles code for jest)
├── docker.registry    # registry for new docker images
├── eslint.config.js   # global eslint config
├── jest.config.js     # global jest config
├── lerna.json         # lerna config file
├── nx.json            # nx targets definition and orchestration
├── package-lock.json  # global npm lockfile (important)
├── package.json       # monorepo dependencies and workspaces
├── tsconfig.json      # global tsconfig
└── typedoc.config.js  # global typedoc config
```

- Individual packages structures are detailed in their respective `README` pages.

## CI / CD pipeline

- Available CI / CD [tasks](https://lerna.js.org/docs/features/run-tasks) are executed using `lerna` and depend on packages types :

| name              | npm | node | frontend | e2e | external | description                                                  |
|-------------------|-----|------|----------|-----|----------|--------------------------------------------------------------|
| `list`            |  X  |  X   |    X     |  X  |          | Lists known types for the package                            |
| `dev`             |     |  X   |    X     |     |    X     | Starts the package in dev mode                               |
| `typecheck`       |  X  |  X   |    X     |  X  |          | Validates the package types against `tsconfig`               |
| `lint`            |  X  |  X   |    X     |  X  |          | Lints the package code against `eslint.config.js`            |
| `test`            |  X  |  X   |    X     |  X  |          | Runs `jest` tests for the package                            |
| `types:build`     |  X  |      |          |     |          | Creates `*.d.ts` files for the package types                 |
| `build`           |  X  |  X   |    X     |  X  |          | Creates the package build                                    |
| `publish`         |  X  |      |    X     |     |          | Publishes the package build depending on its type            |
| `docker:lockfile` |     |  X   |          |     |          | Copies global `package-lock.json` to the package directory   |
| `docker:build`    |     |  X   |          |  X  |    X     | Bundles the package and its dependencies into a docker image |
| `docker:push`     |     |  X   |          |     |    X     | Pushes the docker image into the configured docker registry  |
| `docs:build`      |  X  |  X   |    X     |     |          | Builds `typedoc` documentation for the package               |

- Tasks are orchestrated as targets according to the `nx` [configuration](./nx.json).
- Type `npx lerna run <task>` to execute the pipeline up to the specified target.
- Depending on the use case, other tasks can be added and `nx` config must be updated accordingly.
- Required tasks for external packages can vary depending on the use case.

## Dependencies management

- The recommended way of updating dependencies for the monorepo or for individual packages is to :
  - Update the relevant `package.json` files.
  - Run `npm run deps:install` so as to preserve the consistency of [`package-lock.json`](./package-lock.json) (very important).
- The npm dependency graph sometime breaks which causes the `docker:build` target to error (a npm message will show in the docker logs).
- If that happens, run the following commands :

```bash
# delete lockfile, node_modules folder and nx cache
npm run deps:reset

# reinstall dependencies and clean rebuild graph and lockfile
npm run deps:install
```

## Features

#### Static typing and linting

| <center>**module**</center>                                    | <center>**usage**</center>                           |
|----------------------------------------------------------------|------------------------------------------------------|
| <code>[typescript](https://www.typescriptlang.org/)</code>     | Static typing for the entire monorepo.               |
| <code>[eslint](https://github.com/privatenumber/tsx)</code>    | Static code analysis for the entire monorepo.        |
| <code>[tsx](https://github.com/privatenumber/tsx)</code>       | On-demand compilation for node.js packages.          |
| <code>[zod](https://github.com/colinhacks/zod/)</code>         | Server-side data parsing and validation at runtime.  |
| <code>[typedoc](https://github.com/TypeStrong/typedoc/)</code> | Build package documentation from types and comments. |

#### DX

| <center>**module**</center>                               | <center>**usage**</center>                                                                                                               |
|-----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| <code>[dotenv](https://github.com/motdotla/dotenv)</code> | Load environment variables from config files.                                                                                            |
| <code>[nodemon](https://nodemon.io/)</code>               | Auto-restart on file changes during node.js package development.                                                                         |
| <code>[vite](https://vitejs.dev/)</code>                  | <code>[HMR](https://www.sanity.io/glossary/hot-module-replacement)</code> + auto-reload on file change during frontend apps development. |

#### Building

| <center>**module**</center>                                                        | <center>**usage**</center>                                                                                                                      |
|------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| <code>[npm](https://www.npmjs.com/)</code>                                         | Create packages for code reusability across the entire [workspace](https://lerna.js.org/docs/getting-started#adding-lerna-to-an-existing-repo). |
| <code>[esbuild](https://esbuild.github.io/)</code>                                 | Create builds for npm and node.js packages.                                                                                                     |
| <code>[vite](https://vitejs.dev/)</code>                                           | Create builds for frontend packages.                                                                                                            |
| <code>[docker buildx](https://docs.docker.com/reference/cli/docker/buildx/)</code> | Create docker images for node.js and external packages.                                                                                         |

#### Testing

| <center>**module**</center>                                               | <center>**usage**</center>                       |
|---------------------------------------------------------------------------|--------------------------------------------------|
| <code>[jest](https://jestjs.io/)</code>                                   | Run unit tests for npm and node.js packages.     |
| <code>[testing-library](https://testing-library.com/)</code>              | Run unit tests for frontend packages components. |
| <code>[puppeteer](https://pptr.dev/)</code>                               | Run end to end tests through browser automation. |
| <code>[jest-puppeteer](https://github.com/argos-ci/jest-puppeteer)</code> | Add jest matchers support for end-to-end tests.  |

#### CI/CD pipeline

| <center>**module**</center>                                                        | <center>**usage**</center>                                                  |
|------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| <code>[nx](https://nx.dev/)</code>                                                 | Orchestrate the pipeline across all packages, manage tasks execution cache. |
| <code>[lerna](https://lerna.js.org/docs/introduction)</code>                       | Manage the monorepo and run the CI/CD pipeline.                             |

## Footnotes

- This project is at its fourth major iteration (it started with plain javascript, then react, then typescript, and now a full blown typescript-based monorepo).