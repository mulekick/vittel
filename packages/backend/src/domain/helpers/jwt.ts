/**
 * Feature agnostic helpers.
 * @module
 * @remarks
 * - Scope : DOMAIN / HELPERS.
 * - Implements feature-agnostic helpers in dedicated modules.
 * - Helpers functions should not involve the controller or data layers.
 */

// import primitives
import {KeyObject, createPrivateKey, createPublicKey, randomBytes} from "node:crypto";

// import modules
import {SignJWT, jwtVerify} from "jose";
import config from "../../config.ts";

// import types
import type {JWTPayload, JWTVerifyResult} from "jose";

/**
 * Subject (why we deliver a token)
 */
const s = `access to protected site resources`;

/**
 * Destructure config values, use server key / cert for JWTs
 */
const {APP_KEYPAIR_ALG, APP_TOKEN_VALIDITY, APP_TLS_OPTIONS: {key, cert}} = config;

/**
 * Create private / public cryptokeys objects
 * @remarks
 * - Use node builtins to allow pem instead of pkcs
 */
const [ prvk, pubk ]: [KeyObject, KeyObject] = [
    createPrivateKey({key: key as string, format: `pem`}),
    createPublicKey({key: cert as string, format: `pem`})
];

/**
 * Create jwt string from payload object
 */
export const signToken = (payload: JWTPayload): Promise<string> => new SignJWT(payload)
    // signing key algorithm
    .setProtectedHeader({alg: APP_KEYPAIR_ALG})
    // relevant to delivering a token
    .setSubject(`urn:${ s }`)
    // unique id (beware because randomBytes() is sync ...)
    .setJti(randomBytes(16).toString(`hex`))
    // issuance timestamp
    .setIssuedAt()
    // expiration tims (seconds)
    .setExpirationTime(`${ String(APP_TOKEN_VALIDITY) }s`)
    // sign with server private key
    .sign(prvk);

/**
 * Verify jwt signature from string
 */
export const verifyToken = (token: string): Promise<JWTVerifyResult> => jwtVerify(token, pubk, {
    // validate algorithm
    algorithms: [ APP_KEYPAIR_ALG ],
    // validate token subject
    subject: `urn:${ s }`
});