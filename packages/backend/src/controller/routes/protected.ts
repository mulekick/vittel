/**
 * Feature-specific express router.
 * @module
 * @remarks
 * - Scope : CONTROLLER / ROUTES.
 * - Routes that expose the protected API.
 */

// import modules
import {Router} from "express";
import {mToken, mProtection, mFallback} from "../middlewares/protected.ts";
import {mUpload} from "../middlewares/upload.ts";

/**
 * Mounts protected API middlewares on /protected
 * @see {@link mToken | Route for serving token}
 * @see {@link mProtection | Protection middleware}
 * @see {@link mUpload | Route to process file uploads}
 * @see {@link mFallback | Protected resources sit there}
 */
export const xProtected: Router = Router()
    .get(`/token`, mToken)
    .use(mProtection)
    .post(`/upload`, mUpload)
    .get(`*`, mFallback);