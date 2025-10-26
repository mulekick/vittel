/**
 * Server config file.
 * @module
 * @remarks
 * - Scope : GENERAL.
 * - Uses dotenv to read the config file according to NODE_ENV value.
 * - Loads the config values from process.env and export the resulting config object
 */

/* eslint-disable @stylistic/object-curly-newline */

// import primitives
import process from "node:process";
import {URL, fileURLToPath} from "node:url";
import {resolve} from "node:path";

// import modules
import {config} from "dotenv";
import {configParseNumber} from "@vittel/utils/common";

// import types
import type {SecureVersion} from "node:tls";
import type {BackendConfigSignature} from "@vittel/types";

// retrieve current folder
const dirName = fileURLToPath(new URL(`.`, import.meta.url));

// use dotenv to load config file into process.env (relative to process working directory)
config({path: resolve(String(process.env.ENV_DIR), `.env.${ String(process.env.NODE_ENV) }`)});

// destructure from process.env (eslint rule disabled for readability)
const {
    // server only variables
    VITE_SRV_ENTRYPOINT,
    APP_HOST,
    APP_PORT,
    APP_ENABLE_HTTPS,
    APP_SERVE_BUNDLE,
    APP_BUNDLE_DIR,
    APP_MAX_UPLOAD_SIZE,
    APP_KEYPAIR_ALG,
    APP_COOKIE_NAME,
    APP_TOKEN_VALIDITY,
    APP_CIPHER_SUITES,
    APP_PRIVATE_KEY,
    APP_X509_CERT,
    APP_ECDH_CURVE,
    APP_TLS_MIN_VERSION,
    APP_TLS_MAX_VERSION
} = process.env as Record<string, string>;

/**
 * Create typed config object ... epic typescript situation, break the app on purpose if the config is missing.
 */
const appConfig: BackendConfigSignature = {
    dirName,
    // server entrypoint
    VITE_SRV_ENTRYPOINT,
    // app parameters
    APP_HOST,
    APP_PORT: configParseNumber(APP_PORT, 0),
    APP_ENABLE_HTTPS: APP_ENABLE_HTTPS === `true`,
    APP_SERVE_BUNDLE: APP_SERVE_BUNDLE === `true`,
    APP_BUNDLE_DIR,
    // uploads
    APP_MAX_UPLOAD_SIZE: configParseNumber(APP_MAX_UPLOAD_SIZE, 100),
    // JWT and session cookie parameters
    APP_KEYPAIR_ALG,
    APP_COOKIE_NAME,
    APP_TOKEN_VALIDITY: configParseNumber(APP_TOKEN_VALIDITY, 0),
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