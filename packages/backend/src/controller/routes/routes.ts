/**
 * Main express router
 * @module
 * @remarks
 * - Scope : CONTROLLER / ROUTES.
 * - Mounts specific routers to VITE_SRV_ENTRYPOINT to expose the server API.
 */

// import modules
import {Router} from "express";
import {xPublic} from "./public.ts";
import {xProtected} from "./protected.ts";
import {xErrors} from "./errors.ts";

/**
 * Mounts imported routers on the app entrypoint
 * @see {@link xPublic | Route for serving public data}
 * @see {@link xProtected | Route for serving protected data}
 * @see {@link xErrors | Route for benchmarking error handlers}
 */
const xRoutes: Router = Router();

xRoutes
    .use(`/public`, xPublic)
    .use(`/protected`, xProtected)
    .use(`/error`, xErrors);

export {xRoutes};