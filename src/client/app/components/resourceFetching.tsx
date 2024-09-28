// import modules
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";

// import interfaces
import {TextContentPropsSignature} from "../../../interfaces.ts";

const
    // ...
    ResourceFetching = (props: TextContentPropsSignature): React.JSX.Element => {
        // extract props
        const {content} = props;

        // return component
        return (
            <article>
                { /* fetching */ }
                <span className="small highlight">
                    <FontAwesomeIcon icon={ faSquareCheck } />
                    { ` ` }
                    Server resources fetching:
                </span>
                <span className="small">{ content }</span>
            </article>
        );
    };

export default ResourceFetching;