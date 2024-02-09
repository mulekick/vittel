// import modules
import {Router} from "express";
import xFetch from "./fetch.ts";
import xUpload from "./upload.ts";
import xProtected from "./protected.ts";

// import middlewares
import mError from "../middlewares/error.ts";

const
    // eslint-disable-next-line new-cap
    xRoutes:Router = Router();

// mount specific routers and middlewares to a single entrypoint for the server to use
xRoutes
    // route for serving dynamic content
    .use(`/fetch`, xFetch)
    // route for handling file uploads
    .use(`/upload`, xUpload)
    // protected route
    .use(`/protected`, xProtected)
    // route for throwing an error
    .use(`/error`, mError);

export default xRoutes;