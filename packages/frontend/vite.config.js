// import primitives
import process from "node:process";
import {resolve} from "node:path";
import {URL, fileURLToPath} from "node:url";

// import modules
import {defineConfig, loadEnv} from "vite";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import {webfontDownload} from "vite-plugin-webfont-dl";
import {config} from "dotenv";

// note : for more flexibility and fine tuning, all paths included in this config
// will be absolute paths pointing to subdirectories of the current project's root
export default defineConfig(({command, mode}) => {
    // ignore command
    void command;
    // retrieve current config folder
    const dirName = fileURLToPath(new URL(`.`, import.meta.url));
    // retrieve environment files folder
    const envDir = resolve(dirName, `.env.files`);
    // vite project root folder
    const rootDir = resolve(dirName, `src`);
    // use dotenv to load express related config into process.env
    config({path: `${ envDir }/.env.${ process.env.NODE_ENV }`});
    // destructure from process.env
    const {APP_HOST, APP_PORT, APP_ENABLE_HTTPS, APP_CIPHER_SUITES, APP_PRIVATE_KEY, APP_X509_CERT, APP_ECDH_CURVE, APP_TLS_MIN_VERSION, APP_TLS_MAX_VERSION} = process.env;
    // load current vite-specific
    const {VITE_HOST, VITE_PORT, VITE_SRV_ENTRYPOINT} = loadEnv(mode, envDir, `VITE_`);
    // enable https or not (no typescript ...)
    const enableHttps = APP_ENABLE_HTTPS === `true`;
    // init config
    const cfg = {
        // environment files directory
        envDir,
        // project filesystem root
        root: rootDir,
        // base server path
        base: `/`,
        // static file serving for development (becomes / at build time)
        publicDir: `${ rootDir }/public`,
        // prefix for environment variables
        envPrefix: `VITE_`,
        // interface to listen to (serve)
        server: {
            host: VITE_HOST,
            port: VITE_PORT,
            // exit if port is busy
            strictPort: true,
            // enable https in dev mode
            https: enableHttps ?
                {
                    ciphers: APP_CIPHER_SUITES,
                    key: APP_PRIVATE_KEY,
                    cert: APP_X509_CERT,
                    ecdhCurve: APP_ECDH_CURVE,
                    maxVersion: APP_TLS_MAX_VERSION,
                    minVersion: APP_TLS_MIN_VERSION,
                    // force TLS simple mode
                    requestCert: false
                } :
                null,
            // enable proxying to express
            proxy: {
                // with RegEx
                [`^${ VITE_SRV_ENTRYPOINT }/.*`]: {
                    // it is assessed that vite and express run on the same host during development
                    target: `${ enableHttps ? `https` : `http` }://${ APP_HOST }:${ APP_PORT }`,
                    // allow self-signed certificates
                    secure: false
                }
            }
        },
        /*
        // interface to listen to (preview) - not using vite in preview mode, will statically serve through express
        preview: {},
        */
        // build options
        build: {
            // target modern browsers (overriden by legacy plugin)
            // target: `modules`,
            // build directory (must be relative to project root ...)
            outDir: `../dist`,
            // assets output directory for the build
            assetsDir: `assets`,
            // suppress warning on build directory reset
            emptyOutDir: true,
            // rollup bundle entry point (1 entry point per site page monkaS)
            rollupOptions: {
                input: {
                    main: `${ rootDir }/index.html`
                }
            }
        },
        // load postcss config (postcss.config.js)
        // postcss plugins will be used for serve and build
        css: {postcss: `.`},
        // vite plugins config
        plugins: [
            // serve / build
            // use vite plugin for jsx transpilation
            react(),
            // build
            // target every browser that support TLS 1.2 and beyond
            // (@babel/preset-env will auto-detect .browserslistrc)
            // (cf. https://wiki.mozilla.org/Security/Server_Side_TLS)
            // (cf. https://caniuse.com/tls1-2)
            legacy({}),
            // serve / build
            // self-host third-party webfonts to avoir render blocking behavior
            webfontDownload([
                `https://fonts.googleapis.com/css2?family=Inconsolata&family=Protest+Riot&display=swap`
            ])
        ]
    };
    return cfg;
});