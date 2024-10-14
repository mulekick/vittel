/** @type {import('jest-environment-puppeteer').JestPuppeteerConfig} */

export default {
    launch: {
        // use new headless mode
        headless: true,
        // allow self-signed certificates
        args: [ `--ignore-certificate-errors` ]
    }
};