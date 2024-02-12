// import primitives
import console from "node:console";

// import modules
import {RequestHandler} from "express";
import config from "../config.ts";
import {signToken, verifyToken} from "../helpers/jwt.ts";

const
    // destructure config values
    {APP_ENABLE_HTTPS, APP_COOKIE_NAME} = config,
    // equivalent to the 'login' route - will serve a token everytime
    mToken:RequestHandler = async(req, res, next) => {
        try {
            const
                // create token from payload
                token = await signToken({
                    permission: `access to protected content granted`
                });

            return res
                .status(201)
                .cookie(APP_COOKIE_NAME as string, token, {
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

        } catch (err:unknown) {
            // delegate to error handling middleware
            return next(err);
        }
    },
    // protection middleware - verify JWT
    // async I/O operation requires try...catch in express 4
    mProtection:RequestHandler = async(req, res, next) => {
        try {

            // if token is valid
            if (req.cookies[APP_COOKIE_NAME as string]) {
                const
                    // read token claims
                    {payload: {permission}} = await verifyToken(req.cookies[APP_COOKIE_NAME as string]);
                // success
                console.log(`received valid client token for '${ permission }'`);
                // process to next middleware
                return next();
            }

            // send a 401 if cookie is missing
            return res
                .status(401)
                .send(`you are not allowed to access this resource 😬`);

        } catch (err:unknown) {
            // send a 401 if token is invalid
            // @ts-expect-error jose error types are not exported ...
            if (err.code === `ERR_JWT_EXPIRED` || err.code === `ERR_JWT_CLAIM_VALIDATION_FAILED`) {
                return res
                    .status(401)
                    .send(`you are not allowed to access this resource 😬`);
            }
            // delegate to error handling middleware
            return next(err);
        }
    },
    // fallback middleware
    mFallback:RequestHandler = (req, res) => {
        res
            .status(200)
            .send(`you now have access to protected resources 😎`);
    };

export {mToken, mProtection, mFallback};