// import modules
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFrog} from "@fortawesome/free-solid-svg-icons";

// import types
import type {TextContentPropsSignature} from "../../../interfaces.ts";

const
    // ...
    ModuleBundling = (props: TextContentPropsSignature): React.JSX.Element => {
        // extract props
        const {pepe} = props;

        // return component
        return (
            <article>
                { /* client side npm module */ }
                <span className={ `small highlight` }>
                    <FontAwesomeIcon icon={ faFrog } />
                    { ` ` }
                    { `Include npm modules in client bundle:` }
                </span>
                <a href={ `https://www.npmjs.com/package/@mulekick/pepe-ascii` } target={ `_blank` } rel={ `noreferrer` }>
                    <textarea id={ `pepe` } className={ `pepe` } data-testid={ `pepe` } defaultValue={ pepe } />
                </a>
            </article>
        );
    };

export default ModuleBundling;