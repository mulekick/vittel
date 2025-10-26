/**
 * Main server file.
 * @module
 * @remarks
 * - Scope : GENERAL.
 * - Main server file, entrypoint for the application.
 */

// import primitives
import process from "node:process";
import console from "node:console";
import {createServer as httpCreateServer} from "node:http";
import {createServer as httpsCreateServer} from "node:https";

// import modules
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import {setRequestLocalsExpress, httpLogger} from "@vittel/utils";
import {unhandledRejection, uncaughtException} from "@vittel/utils/errors";
import config from "./config.ts";
import {xRoutes} from "./controller/routes/routes.ts";
import {defaultFallback, errorHandling} from "./controller/middlewares/defaults.ts";
import {subscribe} from "./controller/middlewares/subscriber.ts";

// import types
import type {Application} from "express";
import type {Server as httpServer} from "node:http";
import type {Server as httpsServer} from "node:https";

// destructure config values
const {dirName, VITE_SRV_ENTRYPOINT, APP_HOST, APP_PORT, APP_ENABLE_HTTPS, APP_SERVE_BUNDLE, APP_BUNDLE_DIR, APP_TLS_OPTIONS} = config;

/**
 * Subscribe to a message queue
 */
subscribe();

/**
 * Create express app
 */
const xApp: Application = express()
    // enable cors for all routes, resources will be served to any origin
    .use(cors({origin: `*`}))
    // setup default security related response headers (list on module homepage)
    // disable requests upgrade if https is disabled ...
    .use(helmet(APP_ENABLE_HTTPS ? undefined : {contentSecurityPolicy: {directives: {"upgrade-insecure-requests": null}}}))
    // bind a key / value store for request locals management ...
    .use(setRequestLocalsExpress)
    // route HTTP logging to global app logger
    .use(httpLogger)
    // parse cookies and populate request with keyed object
    .use(cookieParser())
    // mount server routes to entrypoint so static content can be served from /
    .use(VITE_SRV_ENTRYPOINT, xRoutes);

// imho request body size limit has to be enforced regardless of the content-type
// header so body parsing middlewares can't be used for that: size limit has to be
// enforced at proxy level and the same rule applies for rate limiting.
// https://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size
// https://nginx.org/en/docs/http/ngx_http_limit_req_module.html#limit_req

// manage static content serving (development / production)
if (process.env.NODE_ENV === `production`) {
    // route for serving static content
    if (APP_SERVE_BUNDLE)
        xApp.use(`/`, express.static(`${ dirName }/${ String(APP_BUNDLE_DIR) }`));
} else if (process.env.NODE_ENV === `development`) {
    // stop express (ok to force process exit here since we're in dev mode)
    process.on(`SIGINT`, () => {
        console.debug(`express server(${ String(process.pid) }) received SIGINT, stopping and exiting.`);
        process.nextTick(() => process.exit(0));
    });

} else {
    // throw error, server can't run like that
    throw new Error(`static content serving mode not specified`);
}

/**
 * Bind default fallback route and error handler
 */
xApp
    .use(`*`, defaultFallback)
    .use(errorHandling);

/**
 * Attach last resort handlers
 */
process
    .on(`unhandledRejection`, unhandledRejection)
    .on(`uncaughtException`, uncaughtException);

/**
 * Create server handle
 */
const netServer: httpServer | httpsServer = APP_ENABLE_HTTPS ? httpsCreateServer(APP_TLS_OPTIONS, xApp) : httpCreateServer(xApp);

/**
 * Start server
 */
netServer.listen(APP_PORT, APP_HOST, () => {httpLogger.logger.info(`service listening on ${ APP_ENABLE_HTTPS ? `https` : `http` }://${ APP_HOST }:${ String(APP_PORT) }`);});