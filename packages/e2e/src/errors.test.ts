/**
 * @jest-environment jest-environment-puppeteer
 */

// import primitives
import process from "node:process";
import console from "node:console";
import {URL, fileURLToPath} from "node:url";
import {resolve} from "node:path";
import {fork} from "node:child_process";

// import modules
import "jest-puppeteer";
import "expect-puppeteer";
import {beforeAll, describe, it, afterAll} from "@jest/globals";
import {config} from "dotenv";

// retrieve current folder
const dirName = fileURLToPath(new URL(`.`, import.meta.url));

// use dotenv to load config file into process.env
config({path: resolve(String(process.env.ENV_DIR), `.env.${ String(process.env.NODE_ENV) }`)});

// destructure config values - since the e2e tests run against
// the project build, I prefer not to use the server config for
// it would require importing a module from the source files ...
const {VITE_SRV_ENTRYPOINT, APP_HOST, APP_PORT, APP_ENABLE_HTTPS} = process.env as Record<string, string>;
// api url
const apiUrl = `${ APP_ENABLE_HTTPS === `true` ? `https` : `http` }://${ APP_HOST }:${ APP_PORT }${ VITE_SRV_ENTRYPOINT }`;
// create abort controller
const controller: AbortController = new AbortController();

describe(`api error handling tests suite`, (): void => {
    // setup
    beforeAll(async(): Promise<void> => {
        console.log(`starting app ... ${ apiUrl }`);
        // start app
        fork(resolve(dirName, `..`, `..`, `backend`, `dist`, `server.js`), {
            // submit to abort controller signal for termination
            signal: controller.signal,
            // not-so-obvious default option
            env: process.env,
            // use SIGTERM
            killSignal: `SIGTERM`,
            // mute app output
            stdio: `ignore`
        })
            // termination handler
            .on(`error`, e => {console.error(`express server shut down: ${ e.message }\n${ String(controller.signal.reason) }`);});
        // let's give the app one second to breathe ...
        await new Promise(r => {setTimeout(r, 1e3);});
    });

    describe(`when hitting the sync error throwing route`, (): void => {
        // test /error/throw route
        it(`should display an 'unrecognized error' message`, async(): Promise<void> => {
            await page.goto(`${ apiUrl }/error/throw`);
            await expect(page).toMatchTextContent(`unrecognized error 💀`, {timeout: 5e3});
        });
    });

    describe(`when hitting the async error emitting route`, (): void => {
        // test /error/emit route
        it(`should display an 'unrecognized error' message`, async(): Promise<void> => {
            await page.goto(`${ apiUrl }/error/emit`);
            await expect(page).toMatchTextContent(`unrecognized error 💀`, {timeout: 5e3});
        });
    });

    // teardown
    afterAll((): void => {
        // send abort signal to app
        console.log(`stopping app ...`);
        controller.abort(`tests are completed`);
    });
});