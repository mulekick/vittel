import config from "../../jest.config.js";

export default {
    ...config,
    // use puppeteer for e2e tests
    preset: `jest-puppeteer`
};