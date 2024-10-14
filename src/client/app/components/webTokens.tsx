// import modules
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";

// import helpers
import {getAsync} from "../helpers/helpers.ts";
import {VITE_SRV_ENTRYPOINT} from "../helpers/env.ts";

// import interfaces
import {TextContentPropsSignature} from "../../../interfaces.ts";

const
    // ...
    WebTokens = (props: TextContentPropsSignature): React.JSX.Element => {
        const
            // extract props
            {protectedContent} = props,
            // retrieve token by triggering an async call and disarding return value
            tokenPlease = (): void => {void getAsync(`${ VITE_SRV_ENTRYPOINT }/protected/token`, () => null);};

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