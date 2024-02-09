// import primitives
import {createHash} from "node:crypto";

// import modules
import {RequestHandler} from "express";

const
    // data fetching middleware function
    mFetch:RequestHandler = (req, res) => {
        res
            .status(200)
            // generate random hash
            .send(createHash(`sha256`)
                .update(String(new Date().getTime()))
                .digest(`hex`)
                .substring(0, 32));
    },
    // data fetching fallback middleware
    mFallback:RequestHandler = (req, res) => {
        res
            .status(200)
            .send(`resources sitting here will be served to anybody 😁`);
    };

export {mFetch, mFallback};