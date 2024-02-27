# <center>Vittel</center>

Full-stack [unopinionated](https://stackoverflow.com/questions/802050/what-is-opinionated-software) express powered javascript framework that :

| <center>**Uses**</center>                                                                                                    | <center>**For**</center>                                                                                                            |
| -----------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| <code>[typescript](https://www.typescriptlang.org/)</code> <code>[tsx](https://github.com/privatenumber/tsx)</code>          | Static typing and on-demand compilation for the entire codebase                                                                     |
| <code>[react](https://react.dev/)</code>                                                                                     | Declarative and component-based user interface development                                                                          |
| <code>[vite](https://vitejs.dev/)</code>                                                                                     | <code>[HMR](https://www.sanity.io/glossary/hot-module-replacement)</code> and browser auto-reload on file change during development |
| <code>[nodemon](https://nodemon.io/)</code>                                                                                  | Server auto-restart on file changes during development                                                                              |
| <code>[dotenv](https://github.com/motdotla/dotenv)</code>                                                                    | Loading environment variables from configuration files                                                                              |
| <code>[jose](https://github.com/panva/jose)</code> <code>[cookie-parser](https://github.com/expressjs/cookie-parser)</code>  | Managing stateless client-side sessions with <code>[JSON web tokens](https://jwt.io/)</code>                                        |
| <code>[formidable](https://github.com/node-formidable/formidable)</code>                                                     | Handling file uploads and multipart form data                                                                                       |
| <code>[esbuild](https://esbuild.github.io/)</code>                                                                           | Bundling server-side code into builds that run on any modern node.js version                                                        |
| <code>[vite](https://vitejs.dev/)</code> <code>[postcss](https://postcss.org/)</code>                                        | Bundling client-side code into builds that run in any TLSv1.2+ compatible browser                                                   |
| <code>[jest](https://jestjs.io/)</code>                                                                                      | Running unit tests for server-side business logic                                                                                   |
| <code>[testing-library](https://testing-library.com/)</code>                                                                 | Running unit tests for individual react components                                                                                  |
| <code>[puppeteer](https://pptr.dev/)</code><br><code>[jest-puppeteer](https://github.com/argos-ci/jest-puppeteer)</code>     | Running end to end tests through browser automation                                                                                 |

## Why this

I designed this project to acquire a basic understanding of how different things work together in a self-contained development solution.

✅ The idea is to create a full-stack development framework following these principles :

   - 🚀 Remain as generic as possible (no default integration of any framework or library except react).

   - 🚀 Remain as manageable as possible by relying on a single package.json file.

   - 🚀 Silo the back-end and frontend during development - vite server and express run in separate processes.

   - 🚀 Provide extensive capabilities for writing tests (unit, components and e2e tests).

   - 🚀 Provide typescript support across the entire codebase.

   - 🚀 Create builds that can be seamlessly packed into a Docker image.

✅ DX is guaranteed to be smooth and enjoyable.

✅ All the dependencies included by default are the go-to modules of the ecosystem for their respective usages.

✅ Scaffold your project and integrate any additional dependency you need in an incremental, controlled way.

## Prerequisites

| <center>Required software</center> | <center>Recommended version</center> |
| -----------------------------------|--------------------------------------|
| Linux                              | Debian 12 bookworm                   |
| GNU Bash shell                     | ```5.2.15```                         |
| Openssl                            | ```3.0.11```                         |
| Node.js                            | ```20.0.9```                         |
| NPM                                | ```10.2.3```                         |
| Docker                             | ```25.0.2```                         |
| Puppeteer compatible browser       | google chrome / puppeteer defaults   |

#### 👀 Important notes :

- ⚠️ Running puppeteer on linux requires [dependencies](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#chrome-doesnt-launch-on-linux) usually shipped with any desktop environment.

- ⚠️ Installing a desktop environment is therefore recommended (I use [xfce](https://gcore.com/learning/how-to-install-xfce-on-debian/)). 

## Project scaffolding

1. Use the following commands to scaffold a new project :

```bash
# clone the repository using degit
npx degit https://github.com/mulekick/vittel.git myproject
# cd into your project's folder
cd myproject
# clean install dependencies (important)
npm ci
```

2. Optional : create a new key pair for the server _**(do not change the command arguments)**_ : 

```bash
# create a private key
openssl ecparam -param_enc named_curve -name prime256v1 -genkey -noout -outform PEM -out .server.key
# create a self-signed certificate
openssl req -x509 -key .server.key -new -outform PEM -out .server.crt -verbose
# use the newly created key pair in development or production :
#  - open a dotenv config file from the .env.files directory
#  - change the value of the APP_PRIVATE_KEY variable to the contents of .server.key.
#  - change the value of the APP_X509_CERT variable  to the contents of .server.crt. 
#  - save the dotenv config file 
```

#### 👀 Important notes :

- ⚠️ The server uses the key pair to sign / verify the JWTs and for HTTPS (if enabled).

- ⚠️ If you want to do step 2, I assume you are comfortable with TLS and key pairs management.

- ⚠️ If you're not, dummy key pairs are provided in the .env files so HTTPS and JWTs work out of the box.

- ⚠️ **_In those circumstances, seek assistance on the matter prior to pushing anything in production._**

## Project file system

```bash
.
├── .env.files           
│   ├── .env.development       # dotenv config file (development) 
│   └── .env.production        # dotenv config file (production)
├── .vscode                  
│   └── launch.json            # vscode debug configurations (dev, build and tests)
├── dist                      
│   └── *.*                    # react app + express server build
├── dist.test                 
│   └── *.test.ts              # end to end tests files
├── node_modules                     
│   └── *.*                    # ...
├── src  
│   │
│   ├── client                 # ====== react app source files ======= 
│   │   ├── app
│   │   │   ├── *.tsx          # react components
│   │   │   ├── *.ts           # non react code (helpers etc) 
│   │   │   └── *.test.ts      # unit / react components tests
│   │   ├── public             
│   │   │   └── *.*            # statically served files (served from / in production mode)
│   │   ├── scss               
│   │   │   └── *.scss         # scss files for the react app
│   │   ├── static
│   │   │   └── *.*            # assets to include in the build (use named imports)
│   │   └── index.html         # main html page (rollup entrypoint) 
│   │
│   ├── server                 # ==== express server source files ====
│   │    ├── helpers                    
│   │    │   └── *.ts          # business agnostic code
│   │    ├── middlewares       
│   │    │   ├── *.ts          # express middlewares (implement business logic)
│   │    │   └── *.test.ts     # unit tests for the business logic
│   │    ├── routes            
│   │    │   ├── routes.ts     # main express router (mounted on VITE_SRV_ENTRYPOINT)
│   │    │   └── *.ts          # express routers to import in routes.ts
│   │    ├── uploads            
│   │    │   └── *.*           # uploads folder
│   │    ├── config.ts         # express server config file
│   │    └── server.ts         # main express server file
│   │
│   └── interfaces.ts          # === typescript types / interfaces ===
│    
├── .browserslistrc            # browserslist queries for babel, autoprefixer and vite
├── .eslintrc.json             # eslint config for typescript and react / jsx support
├── .postcssrc.json            # postcss plugins used for development and build
├── babel.config.json          # react / typescript support for babel-jest
├── Dockerfile                 # bundle the app and server into a docker image
├── jest-puppeteer.config.json # puppeteer config for e2e tests
├── jest.config.json           # transforms to apply before running tests
├── nodemon.json               # nodemon config
├── package.json               # dependencies for the react app and the express server
├── tsconfig.json              # typescript config
└── vite.config.js             # vite config + entrypoints for the rollup build process
```

#### 👀 Important notes :

  - ⚠️ The build process packs all the react app code **_as well as its dependencies_** into a self-sufficient bundle.
   
  - ⚠️ As a result, it is important to **_install react app dependencies as dev dependencies_**.
  
  - ⚠️ The docker image will be optimized in that it will only embark dependencies **_needed by the express server_**.

## Available commands

| <center>Command</center> | <center>Usage</center>                                                                                                    |
| -------------------------|-------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`            | Start the project in development mode<br>HMR and browser auto-reload are enabled<br>Vite proxies requests to express      |
| `npm run list`           | List all files for the current typescript codebase                                                                        |
| `npm run typecheck`      | Typecheck the entire project against the current typescript configuration                                                 |
| `npm run lint`           | Validate the entire project against the current eslint configuration                                                      |
| `npm run test:unit`      | Run unit tests and components tests                                                                                       |
| `npm run test:cover`     | Run unit tests and components tests and print coverage report                                                             |
| `npm run build`          | Build the react app and the express server                                                                                |
| `npm run test:e2e`       | Start a puppeteer automated browser and run the end to end test suite                                                     |
| `npm run prod`           | Start the project in production mode<br>Express serves the app bundle                                                     |
| `npm run docker:build`   | Create a docker image and packs the build files and the production environment in it                                      |
| `npm run docker:up`      | Start an interactive container from the image<br>Container's port ```APP_PORT``` is mapped to the corresponding host port |
| `npm run docker:down`    | Stop the container                                                                                                        |

#### 👀 Important notes :

  - ⚠️ HTTPS is disabled by default, it can be enabled by setting the ```APP_ENABLE_HTTPS``` variable to ```"true"```.

  - ⚠️ JWTs **_won't work in Firefox_** when starting the project with HTTPS disabled.

  - ⚠️ When starting in development mode, the vite dev server listens at ```${ VITE_HOST }:${ VITE_PORT }```.

  - ⚠️ When starting in production mode, the express server listens at ```${ APP_HOST }:${ APP_PORT }```.

## Environment variables

  - All environment variables can be configured in the dotenv config files.

| <center>Variable</center> | <center>Usage</center>           |
| ------------------------- | -------------------------------- |
| `VITE_HOST`               | Vite dev server host             |
| `VITE_PORT`               | Vite dev server port             |
| `VITE_SRV_ENTRYPOINT`     | Server API root route            |
| `APP_HOST`                | Express server host              |
| `APP_PORT`                | Express server port              |
| `APP_ENABLE_HTTPS`        | HTTPS enabled / disabled         |
| `APP_UPLOAD_DIR`          | Server file upload directory     |
| `APP_MAX_UPLOAD_SIZE`     | Max size allowed for uploads     |
| `APP_PRIVATE_KEY`         | Server private key               |
| `APP_X509_CERT`           | Server certificate               |
| `APP_COOKIE_NAME`         | Cookie holding the JWT           |
| `APP_TOKEN_VALIDITY`      | JWT validity duration in seconds |

#### 👀 Important notes :

  - ⚠️ Do not touch any variable that's not in this list **_unless you really know what youre doing_**.

## 📝 Dependencies

| <center>Module</center>                                                      | <center>Usage</center>                            |
| -----------------------------------------------------------------------------|---------------------------------------------------|
| <code>[cookie-parser](https://www.npmjs.com/package/cookie-parser)</code>    | parse cookies from HTTP requests header           |
| <code>[cors](https://www.npmjs.com/package/cors)</code>                      | serve or reject cross origin requests             |
| <code>[dotenv](https://www.npmjs.com/package/dotenv)</code>                  | load server environment variables                 |
| <code>[express](https://www.npmjs.com/package/express)</code>                | node.js web server framework                      |
| <code>[formidable](https://www.npmjs.com/package/formidable)</code>          | handle multipart data and file uploads            |
| <code>[helmet](https://www.npmjs.com/package/helmet)</code>                  | add security-related headers to HTTP responses    |
| <code>[jose](https://www.npmjs.com/package/jose)</code>                      | JSON web tokens javascript implementation         |
| <code>[morgan](https://www.npmjs.com/package/morgan)</code>                  | HTTP logger for express.js                        |

## 📝 Dev dependencies

| <center>Module</center>                                                                                               | <center>Usage</center>                                               |
| ----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| <code>[@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react)</code>                                 | React and jsx syntax support for babel                               |
| <code>[@babel/preset-typescript](https://www.npmjs.com/package/@babel/preset-typescript)</code>                       | Typescript support for babel                                         |
| <code>[@fortawesome/fontawesome-free](https://www.npmjs.com/package/@fortawesome/fontawesome-free)</code>             | Fontawesome free icons package                                       |
| <code>[@fortawesome/fontawesome-svg-core](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core)</code>     | Core svg library for fontawesome                                     |
| <code>[@fortawesome/free-brands-svg-icons](https://www.npmjs.com/package/@fortawesome/free-brands-svg-icons)</code>   | Free fontawesome icons (brands family)                               |
| <code>[@fortawesome/free-regular-svg-icons](https://www.npmjs.com/package/@fortawesome/free-regular-svg-icons)</code> | Free fontawesome icons (regular family)                              |
| <code>[@fortawesome/free-solid-svg-icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons)</code>     | Free fontawesome icons (solid family)                                |
| <code>[@fortawesome/react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome)</code>           | Fontawesome 5 react component using svg with js                      |
| <code>[@jest/globals](https://www.npmjs.com/package/@jest/globals)</code>                                             | Allow explicit imports for jest primitives                           |
| <code>[@mulekick/eslint-config-muleslint](https://www.npmjs.com/package/@mulekick/eslint-config-muleslint)</code>     | Mulekicks's base JS / Node ESLint configuration                      |
| <code>[@mulekick/pepe-ascii](https://www.npmjs.com/package/@mulekick/pepe-ascii)</code>                               | Used as an example of client-side module bundling                    |
| <code>[@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)</code>                     | Custom matchers for react components testing                         |
| <code>[@testing-library/react](https://www.npmjs.com/package/@testing-library/react)</code>                           | React DOM testing utilities                                          |
| <code>[@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event)</code>                 | Fire events the same way the user does                               |
| <code>[@types/(whatever)](https://github.com/DefinitelyTyped/DefinitelyTyped)</code>                                  | Typescript type definitions                                          |
| <code>[@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)</code>       | Typescript specific linting rules for eslint                         |
| <code>[@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)</code>                     | Typescript support for eslint                                        |
| <code>[@vitejs/plugin-legacy](https://www.npmjs.com/package/@vitejs/plugin-legacy)</code>                             | Enable legacy browsers support in vite.js builds                     |
| <code>[@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react)</code>                               | The all-in-one Vite plugin for react projects                        |
| <code>[autoprefixer](https://www.npmjs.com/package/autoprefixer)</code>                                               | Postcss plugin that adds vendor-specific prefixes to CSS rules       |
| <code>[babel-plugin-transform-import-meta](https://www.npmjs.com/package/babel-plugin-transform-import-meta)</code>   | Babel transforms import.meta into legacy code in node.js             |
| <code>[eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)</code>                                 | React specific linting rules for eslint                              |
| <code>[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)</code>                     | Enforces the rules of hooks in react functions                       |
| <code>[jest](https://www.npmjs.com/package/jest)</code>                                                               | Delightful javascript testing                                        |
| <code>[jest-environment-jsdom](https://www.npmjs.com/package/jest-environment-jsdom)</code>                           | DOM test environment for jest                                        |
| <code>[jest-puppeteer](https://www.npmjs.com/package/jest-puppeteer)</code>                                           | Jest preset that enables end-to-end testing with puppeteer           |
| <code>[nodemon](https://www.npmjs.com/package/nodemon)</code>                                                         | Watch server files and auto restart on file change                   |
| <code>[postcss](https://www.npmjs.com/package/postcss)</code>                                                         | A tool for transforming CSS with JavaScript                          |
| <code>[puppeteer](https://www.npmjs.com/package/puppeteer)</code>                                                     | High-level API to control Chrome/Chromium over the DevTools Protocol |
| <code>[react](https://www.npmjs.com/package/react)</code>                                                             | Javascript library for creating user interfaces                      |
| <code>[react-dom](https://www.npmjs.com/package/react-dom)</code>                                                     | React entry point to the DOM and server renderers                    |
| <code>[sass](https://www.npmjs.com/package/sass)</code>                                                               | Auto-compile SCSS files to CSS in vite.js builds                     |
| <code>[terser](https://www.npmjs.com/package/terser)</code>                                                           | Required for minification during the vite.js build process           |
| <code>[tsx](https://www.npmjs.com/package/tsx)</code>                                                                 | TypeScript Execute: Node.js enhanced to run TypeScript & ESM         |
| <code>[typescript](https://www.npmjs.com/package/typescript)</code>                                                   | Bring static typing to javascript code                               |
| <code>[vite](https://www.npmjs.com/package/vite)</code>                                                               | Next generation froontend tooling                                    |
| <code>[vite-plugin-webfont-dl](https://www.npmjs.com/package/vite-plugin-webfont-dl)</code>                           | Extracts, downloads and injects fonts during the build               |

## Footnotes

  - This project is at its third major iteration (it started with plain javascript, then react, now typescript).
  - It is a case of having done [this](https://react.dev/learn/start-a-new-react-project#can-i-use-react-without-a-framework) before the new react docs came out :

![This is a alt text.](https://i.imgur.com/Vk6XfpZ.png "The react team approves 😁")