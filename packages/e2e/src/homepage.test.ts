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

// use dotenv to load config file into process.env (relative to process working directory)
config({path: resolve(String(process.env.ENV_DIR), `.env.${ String(process.env.NODE_ENV) }`)});

// destructure config values - since the e2e tests run against
// the project build, I prefer not to use the server config for
// it would require importing a module from the source files ...
const {APP_HOST, APP_PORT, APP_ENABLE_HTTPS} = process.env as Record<string, string>;
// homepage url
const homepageUrl = `${ APP_ENABLE_HTTPS === `true` ? `https` : `http` }://${ APP_HOST }:${ APP_PORT }`;
// create abort controller
const controller: AbortController = new AbortController();

describe(`app integration tests suite`, (): void => {
    // setup
    beforeAll(async(): Promise<void> => {
        console.log(`starting app ... ${ homepageUrl }`);
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
        // navigate to home page (all tests will run on a single page load) ...
        await page.goto(homepageUrl);
    });

    describe(`when navigating to the home page`, (): void => {
        // test /fetch/inline route
        it(`should display a random string of length 48`, async(): Promise<void> => {
            await expect(page).toMatchTextContent(/[0-9a-f]{48}/ui, {timeout: 5e3});
        });

        // test button
        it(`should display a 'request token' button`, async() => {
            await expect(page).toMatchTextContent(`request a token`, {timeout: 5e3});
        });

        // test /protected route (no token)
        it(`should display an 'authentication cookie not found' message`, async() => {
            await expect(page).toMatchTextContent(`authentication cookie not found`, {timeout: 5e3});
        });

        // test file input
        it(`should display a 'browse for a file' button`, async() => {
            await expect(page).toMatchElement(`input[name="afile"]`, {timeout: 5e3});
        });

        // test button
        it(`should display an 'upload file' button`, async() => {
            await expect(page).toMatchElement(`input[type="submit"]`, {timeout: 5e3});
        });

        // test vite logo
        it(`should display the vite.js logo`, async() => {
            await expect(page).toMatchElement(`img.logo`, {timeout: 5e3});
        });

        // test pepe
        it(`should display some pepe ASCII art`, async() => {
            await expect(page).toMatchElement(`textarea#pepe`, {timeout: 5e3});
        });
    });

    describe(`when requesting a token`, (): void => {
        // test /protected route (with token)
        it(`should display an 'access to protected resources allowed' message`, async(): Promise<void> => {
            await expect(page).toClick(`button#tokenplease`, {text: `request a token`, timeout: 5e3});
            await expect(page).toMatchTextContent(`you now have access to protected resources 😎`, {timeout: 5e3});
        });
    });

    describe(`when uploading a file`, (): void => {
        // test /upload route
        it(`should display a "file uploaded" message along with the upload size`, async(): Promise<void> => {
            await expect(page).toUploadFile(`input[name="afile"]`, resolve(dirName, `..`, `..`, `..`, `README.md`));
            await expect(page).toClick(`input[type="submit"]`);
            await expect(page).toMatchTextContent(/uploaded 'README.md' \(.+\), \d+ bytes/ui, {timeout: 5e3});
        });
    });

    // teardown
    afterAll((): void => {
        // send abort signal to app
        console.log(`stopping app ...`);
        controller.abort(`tests are completed`);
    });
});