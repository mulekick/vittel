/**
 * React app root.
 * @module
 * @remarks
 * - Scope : CLIENT.
 * - Uses builtin vite features to import scss files.
 * - Fontawesome styles will compile into a dedicated style tag in the build.
 */

/* eslint-disable @stylistic/function-paren-newline */

// import modules
import React from "react";
import {createRoot} from "react-dom/client";
import App from "./components/app.tsx";
import config from "./helpers/env.ts";
// @ts-expect-error not using types for css files
import "../scss/main.scss";

// render app
createRoot(document.getElementById(`root`) || document.createElement(`root`))
    .render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );

// read environment
const {BASE_URL, MODE, VITE_HOST, VITE_PORT} = config;

// eslint-disable-next-line n/prefer-global/console
console.log(`application running in ${ MODE } mode at ${ VITE_HOST }:${ String(VITE_PORT) }${ BASE_URL }.`);