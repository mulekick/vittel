/**
 * Feature-specific express router.
 * @module
 * @remarks
 * - Scope : CONTROLLER / ROUTES.
 * - Routes that expose the public API.
 */

// import modules
import {Router} from "express";
import {mFetch, mFallback} from "../middlewares/public.ts";

/**
 * Mounts public API middlewares on /public
 * @see {@link mFetch | Route for fetching public data}
 * @see {@link mFallback | Fallback route for GET}
 */

// eslint-disable-next-line new-cap
export const xPublic: Router = Router()
    .get(`/fetch`, mFetch)
    .get(`*`, mFallback);