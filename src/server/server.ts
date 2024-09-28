/* eslint-disable no-void, node/no-process-env */

// import primitives
import process from "node:process";
import console from "node:console";
import {Server as httpServer, createServer as httpCreateServer} from "node:http";
import {Server as httpsServer, createServer as httpsCreateServer} from "node:https";
import {ChildProcess, fork} from "node:child_process";
import {resolve} from "node:path";

// import modules
import express, {Application, RequestHandler, ErrorRequestHandler} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import config from "./config.ts";
import xRoutes from "./routes/routes.ts";

const
    // destructure config values
    {dirName, VITE_SRV_ENTRYPOINT, APP_HOST, APP_PORT, APP_ENABLE_HTTPS, APP_BUILD_DIR, APP_TLS_OPTIONS} = config,
    // create express app
    xApp: Application = express();

xApp
    // enable cors for all routes, resources will be served to any origin
    .use(cors({origin: `*`}))
    // setup default security related response headers (list on module homepage)
    // disable requests upgrade if https is disabled ...
    .use(helmet(APP_ENABLE_HTTPS ? void 0 : {contentSecurityPolicy: {directives: {"upgrade-insecure-requests": null}}}))
    // setup HTTP logging (use apache format + served content type)
    // request is logged at response time so it's ok to log response headers
    .use(morgan(`:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":res[content-type]"`))
    // parse cookies and populate request with keyed object
    .use(cookieParser())
    // mount server routes to entrypoint so static content can be served from /
    .use(VITE_SRV_ENTRYPOINT, xRoutes);

// manage static content serving (development / production)
if (process.env.NODE_ENV === `production`) {
    // route for serving static content
    xApp.use(`/`, express.static(`${ dirName }/${ String(APP_BUILD_DIR) }`));
} else if (process.env.NODE_ENV === `development`) {
    // fork a new vite.js static development server
    const
        // create abort controller
        controller: AbortController = new AbortController(),
        // start vite server
        viteApp: ChildProcess = fork(resolve(dirName, `../../node_modules/vite/bin/vite.js`), [ `serve` ], {
            // submit to abort controller signal for termination
            signal: controller.signal,
            // not-so-obvious default option
            env: process.env,
            // use SIGTERM
            killSignal: `SIGTERM`
        });

    viteApp
        // termination handler
        .on(`error`, e => {
            console.error(`vite server stopped: ${ e.message }\n${ String(controller.signal.reason) }`);
        });

    // stop vite server when express exits
    process.on(`SIGINT`, () => {
        console.debug(`express server(${ String(process.pid) }) received SIGINT, stopping and exiting.`);
        // send abort signal to vite server
        controller.abort(`express server shut down`);
        // stop express (ok to force process exit here since we're in dev mode)
        process.nextTick(() => process.exit(0));
    });
} else {
    // throw error, server can't run like that
    throw new Error(`static content serving mode not specified`);
}

const
    // default fallback route
    defaultFallbackRoute: RequestHandler = (req, res) => {
        res
            .status(404)
            .send(`requested resource is nowhere to be found 😭`);
    },
    // error handling route
    errorHandlingRoute: ErrorRequestHandler = (err, req, res, next) => {
        // serve error message to client
        if (!res.headersSent) {
            res
                .status(500)
                .send(`error occured: ${ err instanceof Error ? err.message : `unknown error` } 🤬`);
        }
        // hand error to built-in error handler, print stack in server logs
        next(err);
    };

xApp
    .use(`*`, defaultFallbackRoute)
    .use(errorHandlingRoute);

// create server handle
// eslint-disable-next-line @typescript-eslint/no-misused-promises
const netServer: httpServer | httpsServer = APP_ENABLE_HTTPS ? httpsCreateServer(APP_TLS_OPTIONS, xApp) : httpCreateServer(xApp);

// fire that shit up !
netServer.listen(APP_PORT, APP_HOST, () => { console.log(`service listening on ${ APP_ENABLE_HTTPS ? `https` : `http` }://${ String(APP_HOST) }:${ String(APP_PORT) }`); });