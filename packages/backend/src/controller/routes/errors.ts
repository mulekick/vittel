/**
 * Feature-specific express router.
 * @module
 * @remarks
 * - Scope : CONTROLLER / ROUTES.
 * - Routes that expose the error handling patterns API.
 */

// import modules
import {Router} from "express";
import {mThrowError, mEmitError} from "../middlewares/errors.ts";

/**
 * Mounts error handling patterns API middlewares on /error
 * @see {@link mThrowError | Route for throwing an error}
 * @see {@link mEmitError | Route for emitting an error}
 */

// eslint-disable-next-line new-cap
export const xErrors: Router = Router()
    .get(`/throw`, mThrowError)
    .get(`/emit`, mEmitError);