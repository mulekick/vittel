/** @type {import('jest-environment-puppeteer').JestPuppeteerConfig} */

export default {
    launch: {
        // use new headless mode
        headless: `new`,
        // allow self-signed certificates
        args: [ `--ignore-certificate-errors` ]
    }
};