// import modules
import React from "react";

// import interfaces
import {TextContentPropsSignature} from "../../../interfaces.ts";

// import fontawesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";

const
    // ...
    ResourceFetching = (props:TextContentPropsSignature):React.JSX.Element => {
        const
            // extract props
            {content} = props;

        // return component
        return <article>
            { /* fetching */}
            <span className="small highlight">
                <FontAwesomeIcon icon={faSquareCheck} /> Server resources fetching:
            </span>
            <span className="small">server: {content}</span>
        </article>;
    };

export default ResourceFetching;