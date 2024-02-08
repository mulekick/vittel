/* eslint-disable node/no-process-env */

// import primitives
import process from "node:process";
import {URL, fileURLToPath} from "node:url";
import {resolve} from "node:path";

// import modules
import {config} from "dotenv";

// import interfaces
import {SecureVersion} from "node:tls";
import {ConfigSignature} from "./interfaces.ts";

const
    // retrieve current folder
    dirName = fileURLToPath(new URL(`.`, import.meta.url));

// use dotenv to load config file into process.env
config({path: resolve(dirName, `../.env.files`, `.env.${ process.env.NODE_ENV }`)});

const
    // destructure from process.env
    {VITE_SHA_256_HASH, VITE_SRV_ENTRYPOINT, APP_HOST, APP_PORT, APP_BUILD_DIR, APP_UPLOAD_DIR, APP_MAX_UPLOAD_SIZE, APP_KEYPAIR_ALG, APP_COOKIE_NAME, APP_TOKEN_VALIDITY, APP_CIPHER_SUITES, APP_PRIVATE_KEY, APP_X509_CERT, APP_ECDH_CURVE, APP_TLS_MIN_VERSION, APP_TLS_MAX_VERSION} = process.env,
    // create typed config object ... epic typescript situation, break the app on purpose if the config is missing
    appConfig:ConfigSignature = {
        dirName,
        // environment signature
        VITE_SHA_256_HASH,
        // server entrypoint
        VITE_SRV_ENTRYPOINT,
        // app parameters
        APP_HOST,
        APP_PORT: APP_PORT ? parseInt(APP_PORT, 10) : 0,
        APP_BUILD_DIR,
        APP_UPLOAD_DIR,
        APP_MAX_UPLOAD_SIZE: APP_MAX_UPLOAD_SIZE ? parseInt(APP_MAX_UPLOAD_SIZE, 10) : 100,
        // JWT parameters
        APP_KEYPAIR_ALG,
        APP_COOKIE_NAME,
        APP_TOKEN_VALIDITY: APP_TOKEN_VALIDITY ? parseInt(APP_TOKEN_VALIDITY, 10) : 0,
        // app TLS options
        APP_TLS_OPTIONS: {
            ciphers: APP_CIPHER_SUITES,
            key: APP_PRIVATE_KEY,
            cert: APP_X509_CERT,
            ecdhCurve: APP_ECDH_CURVE,
            maxVersion: APP_TLS_MAX_VERSION as SecureVersion,
            minVersion: APP_TLS_MIN_VERSION as SecureVersion,
            // force TLS simple mode
            requestCert: false
        }
    };

// export
export default appConfig;