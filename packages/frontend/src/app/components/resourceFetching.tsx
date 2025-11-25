/**
 * Public data fetching component.
 * @module
 * @remarks
 * - Scope : CLIENT / COMPONENTS.
 */

// import modules
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";

// import types
import type {ResourceFetchingProps} from "@vittel/types";

/**
 * Minimal component for server data fetching support.
 */
const ResourceFetching = (props: ResourceFetchingProps): React.JSX.Element => {
    // extract props
    const {content} = props;

    // return component
    return (
        <article>
            { /* fetching */ }
            <span className={ `small highlight` }>
                <FontAwesomeIcon icon={ faSquareCheck } />
                { ` ` }
                { `Server resources fetching:` }
            </span>
            <span className={ `small` }>{ content.data }</span>
        </article>
    );
};

export default ResourceFetching;