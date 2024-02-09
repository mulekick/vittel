// import modules
import React from "react";

// import helpers
import {getContentAsync} from "../helpers/helpers.ts";

// retrieve environment
import {VITE_SRV_ENTRYPOINT} from "../helpers/env.ts";

// import interfaces
import {TextContentPropsSignature} from "../../../interfaces.ts";

// import fontawesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";

const
    // ...
    WebTokens = (props:TextContentPropsSignature):React.JSX.Element => {
        const
            // extract props
            {protectedContent} = props,
            // retrieve token by triggering an async call and disarding return value
            tokenPlease = ():Promise<void> => getContentAsync(`${ VITE_SRV_ENTRYPOINT }/protected/token`, () => null);

        // return component
        return <article>
            {/* JWT delivery */ }
            <span className="small highlight">
                <FontAwesomeIcon icon={faSquareCheck} /> Stateless client-side sessions with JSON Web Tokens:
            </span>
            <span className="small">server: {protectedContent}</span>
            <span className="small">
                <button type="button" id="tokenplease" onClick={ tokenPlease } >request a token</button>
            </span>
        </article>;
    };

export default WebTokens;