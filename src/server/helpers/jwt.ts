// import primitives
import {KeyObject, createPrivateKey, createPublicKey, randomBytes} from "node:crypto";

// import modules
import config from "../config.ts";
import {JWTPayload, JWTVerifyResult, SignJWT, jwtVerify} from "jose";

const
    // subject (why we deliver a token)
    s = `access to protected site resources`,
    // destructure config values (use server key / cert for JWTs)
    {APP_KEYPAIR_ALG, APP_TOKEN_VALIDITY, APP_TLS_OPTIONS: {key, cert}} = config,
    // create private / public cryptokeys objects
    [ prvk, pubk ]: [KeyObject, KeyObject] = [
        // use node builtins to allow pem instead of pkcs
        createPrivateKey({key: key as string, format: `pem`}),
        createPublicKey({key: cert as string, format: `pem`})
    ],
    // create jwt string from payload object
    signToken = (payload: JWTPayload): Promise<string> => new SignJWT(payload)
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
        .sign(prvk),
    // verify jwt signature from string
    verifyToken = (token: string): Promise<JWTVerifyResult> => jwtVerify(token, pubk, {
        // validate algorithm
        algorithms: [ APP_KEYPAIR_ALG ],
        // validate token subject
        subject: `urn:${ s }`
    });

export {signToken, verifyToken};