// import modules
import React from "react";

// retrieve environment
import {VITE_SRV_ENTRYPOINT} from "../helpers/env.ts";

// import fontawesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";

const
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    FileUpload = (props:Record<string, never>):React.JSX.Element => <article>
        {/* file upload */}
        <span className="small highlight">
            <FontAwesomeIcon icon={faSquareCheck} /> File uploads (max size 100 kb, configurable):
        </span>
        {/* set form action for uploads */}
        <form encType="multipart/form-data" method="post" action={`${ VITE_SRV_ENTRYPOINT }/public/upload`}>
            <p><input type="file" name="afile" data-testid="afile" /></p>
            <input type="submit" value="upload file" />
        </form>
    </article>;

export default FileUpload;