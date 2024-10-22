// import primitives
import console from "node:console";

// import modules
import config from "../config.ts";
import {signToken, verifyToken} from "../helpers/jwt.ts";
// eslint-disable-next-line node/no-missing-import
import {JOSEError} from "jose/errors";

// import types
import type {RequestHandler} from "express";

const
    // destructure config values
    {APP_ENABLE_HTTPS, APP_COOKIE_NAME} = config,
    // equivalent to the 'login' route - will serve a token everytime
    mToken: RequestHandler = async(req, res, next) => {
        try {
            // create token from payload
            const token = await signToken({
                permission: `access to protected content granted`
            });

            res
                .status(201)
                .cookie(APP_COOKIE_NAME, token, {
                    // anecdotal, its max age is 60 seconds server-side
                    expires: new Date(Date.now() + 3.6e6),
                    // prevent client-side javascript from accessing
                    // the cookie even if not using fetch
                    httpOnly: true,
                    // allow serving cookies in plain http if https disabled ...
                    secure: APP_ENABLE_HTTPS,
                    // do not send cookie to third party requests
                    // (different domain and / or protocol)
                    sameSite: `strict`
                })
                // no data transmission
                .end();
            // eslint compliance
            return undefined;

        } catch (err: unknown) {
            // delegate to error handling middleware
            next(err);
            // eslint compliance
            return undefined;
        }
    },
    // protection middleware - verify JWT
    // async I/O operation requires try...catch in express 4
    mProtection: RequestHandler = async(req, res, next) => {
        try {

            const token = (req.cookies as Record<string, string>)[APP_COOKIE_NAME];

            // if token is valid
            if (token) {
                // read token claims
                const {payload: {permission}} = await verifyToken(token);
                // success
                console.log(`received valid client token for '${ String(permission) }'`);
                // process to next middleware
                next();
                // eslint compliance
                return undefined;
            }

            // send a 401 if cookie is missing
            res
                .status(401)
                .send(`you are not allowed to access this resource 😬`);
            // eslint compliance
            return undefined;

        } catch (err: unknown) {
            // send a 401 if token is invalid
            if (err instanceof JOSEError && (err.code === `ERR_JWT_EXPIRED` || err.code === `ERR_JWT_CLAIM_VALIDATION_FAILED`)) {
                res
                    .status(401)
                    .send(`you are not allowed to access this resource 😬`);
                // eslint compliance
                return undefined;
            }
            // delegate to error handling middleware
            next(err);
            // eslint compliance
            return undefined;
        }
    },
    // fallback middleware
    mFallback: RequestHandler = (req, res) => {
        res
            .status(200)
            .send(`you now have access to protected resources 😎`);
        // eslint compliance
        return undefined;
    };

export {mToken, mProtection, mFallback};