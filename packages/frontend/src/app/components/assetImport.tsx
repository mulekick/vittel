/**
 * Static assets imports component.
 * @module
 * @remarks
 * - Scope : CLIENT / COMPONENTS.
 */

// import modules
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";

// @ts-expect-error vite static asset import ...
import viteLogo from "../../static/vite.svg";

/**
 * Minimal component for static assets imports support.
 * @remarks
 * Vite supports importing any asset as an url - in this case it is mandatory
 * To use a named import and access the asset programatically for it to be included
 * In the build (eg. set the img src attribute programatically) ...
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @stylistic/no-extra-parens
const AssetImport = (props: Record<string, never>): React.JSX.Element => (
    <article>
        { /* assets import */ }
        <span className={ `small highlight` }>
            <FontAwesomeIcon icon={ faSquareCheck } />
            { ` ` }
            { `Static assets imports as urls:` }
        </span>
        <a href={ `https://vitejs.dev` } target={ `_blank` } rel={ `noreferrer` }>
            <img src={ String(viteLogo) } className={ `logo` } alt={ `Vite logo` } />
        </a>
    </article>
);

export default AssetImport;