/**
 * Features that involve restricted / protected data.
 * @module
 * @remarks
 * - Scope : DOMAIN / TRANSACTIONS.
 * - Domain processing can involve calls to the data layer or not.
 * - Results will be parsed and returned if valid, or and error will be thrown.
 * - Do not import controller layer modules here to remain framework agnostic.
 */

/* eslint-disable n/no-sync */

// import modules
import {z} from "zod";
import {JOSEError} from "jose/errors";
import {correlationId, logger} from "@vittel/utils";
import {DomainError, domainErrors} from "@vittel/utils/errors";
import {signToken, verifyToken} from "../helpers/jwt.ts";
import {getProtectedDataSync} from "../../data/database.ts";

// import parsers
import {parsers} from "@vittel/types/parsers";

/**
 * Async: call to domain jwt issuance helper, will throw on fail
 */
export const issueToken = (): Promise<string> => parsers.PromiseOf(z.string()).parse(signToken({permission: `access to protected content granted`}));

/**
 * Async: call to domain jwt validation helper, will throw on fail
 * @see {@link signToken | Sign token}
 */
export const validateToken = async(token: string | undefined): Promise<null> => {
    // fail if cookie is missing
    if (typeof token === `undefined`)
        throw new DomainError(`authentication cookie not found`, domainErrors.USER_AUTHENTICATION_FAILED, null);
    try {
        // read token claims
        const {payload: {permission}} = await verifyToken(token);
        // success
        logger.info({id: correlationId()}, `received valid client token for '${ String(permission) }'`);
        // discard claims and return null
        return z.null().parse(null);
    } catch (err: unknown) {
        // fail w/ domain specific error
        if (err instanceof JOSEError && [ `ERR_JWT_EXPIRED`, `ERR_JWT_CLAIM_VALIDATION_FAILED` ].includes(err.code))
            throw new DomainError(`invalid authentication token`, domainErrors.USER_AUTHENTICATION_FAILED, null);
        // else, rethrow original error
        throw err;
    }
};

/**
 * Sync: call to data layer (protected)
 * @see {@link getProtectedDataSync | Data layer call}
 */
export const getFallback = (): string => z.string().parse(getProtectedDataSync());