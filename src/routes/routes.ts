// import modules
import {Router} from "express";
import xfetch from "./fetch.ts";
import xupload from "./upload.ts";
import xprotected from "./protected.ts";

// import middlewares
import merror from "../middlewares/error.ts";

const
    // eslint-disable-next-line new-cap
    xroutes:Router = Router();

// mount specific routers and middlewares to a single entrypoint for the server to use
xroutes
    // route for serving dynamic content
    .use(`/fetch`, xfetch)
    // route for handling file uploads
    .use(`/upload`, xupload)
    // protected route
    .use(`/protected`, xprotected)
    // route for throwing an error
    .use(`/error`, merror);

export default xroutes;