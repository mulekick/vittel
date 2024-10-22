/* eslint-disable @stylistic/function-paren-newline */

// import modules
import React from "react";
// eslint-disable-next-line node/file-extension-in-import
import {createRoot} from "react-dom/client";
import App from "./components/app.tsx";

// use the built-in vite functionalities to flat import scss files ...
// @ts-expect-error not using types for css files
import "../scss/main.scss";

// retrieve environment
import {BASE_URL, MODE, VITE_HOST, VITE_PORT} from "./helpers/env.ts";

// in this case, since we use the fontawesome react primitives, the
// fontawesome styles will compile into a dedicated <style> tag in the final build.

// render app
createRoot(document.getElementById(`root`) || document.createElement(`root`))
    .render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );

// eslint-disable-next-line node/prefer-global/console
console.log(`application running in ${ MODE } mode at ${ VITE_HOST }:${ VITE_PORT }${ BASE_URL }.`);