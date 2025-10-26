/**
 * Feature-specific express router.
 * @module
 * @remarks
 * - Scope : CONTROLLER / ROUTES.
 * - Routes that expose the error handling patterns API.
 */

/* eslint-disable n/no-sync */

// import modules
import {Router} from "express";
import {mThrowErrorSync, mEmitErrorAsync} from "../middlewares/errors.ts";

/**
 * Mounts error handling patterns API middlewares on /error
 * @see {@link mThrowErrorSync | Route for throwing an error}
 * @see {@link mEmitErrorAsync | Route for emitting an error}
 */
const xErrors: Router = Router();

xErrors
    .get(`/throw`, mThrowErrorSync)
    .get(`/emit`, mEmitErrorAsync);

export {xErrors};