/**
 * Client-side environment variables.
 * @module
 * @remarks
 * - Scope : CLIENT / HELPERS.
 * - This module proxyies the values retrieved from the vite-specific env property
 * - Doing so is mandatory so the config can be mocked in the jest tests for the app.
 * - Type annotations are needed because of the tsconfig "isolatedModules" flag.
 */

// import modules
import {configParseNumber} from "@vittel/utils/common";

// import types
import type {FrontendConfigSignature} from "@vittel/types";

// @ts-expect-error vite-specific env property
const {BASE_URL, MODE, VITE_HOST, VITE_PORT, VITE_SRV_ENTRYPOINT} = import.meta.env as Record<string, string>;
// reexport ...
const config: FrontendConfigSignature = {
    BASE_URL,
    MODE,
    VITE_HOST,
    VITE_PORT: configParseNumber(VITE_PORT, 0),
    VITE_SRV_ENTRYPOINT
};

// reexport ...
export default config;