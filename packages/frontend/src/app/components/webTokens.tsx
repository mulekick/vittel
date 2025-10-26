/**
 * Web tokens usage component.
 * @module
 * @remarks
 * - Scope : CLIENT / COMPONENTS.
 */

// import modules
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";
import config from "../helpers/env.ts";
import {getStringAsync} from "../helpers/helpers.ts";

// import types
import type {WebTokensSignature} from "@vittel/types";

// retrieve environment
const {VITE_SRV_ENTRYPOINT} = config;

/**
 * Minimal component for web tokens support.
 */
const WebTokens = (props: WebTokensSignature): React.JSX.Element => {
    // extract props
    const {protectedContent} = props;
    // retrieve token by triggering an async call and discarding return value
    const tokenPlease = (): void => {
        void getStringAsync(`${ VITE_SRV_ENTRYPOINT }/protected/token`, () => null);
    };

    // return component
    return (
        <article>
            { /* JWT delivery */ }
            <span className={ `small highlight` }>
                <FontAwesomeIcon icon={ faSquareCheck } />
                { ` ` }
                { `Stateless client-side sessions with JSON Web Tokens:` }
            </span>
            <span className={ `small` }>{ protectedContent }</span>
            <span className={ `small` }>
                <button type={ `button` } id={ `tokenplease` } onClick={ tokenPlease }>{ `request a token` }</button>
            </span>
        </article>
    );
};

export default WebTokens;