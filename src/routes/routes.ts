// import modules
import {Router} from "express";

// import middlewares
import xPublic from "./public.ts";
import xProtected from "./protected.ts";
import mError from "../middlewares/error.ts";

const
    // eslint-disable-next-line new-cap
    xRoutes:Router = Router();

// mount specific routers and middlewares to a single entrypoint for the server to use
xRoutes
    // route for serving public data
    .use(`/public`, xPublic)
    // route for serving protected data
    .use(`/protected`, xProtected)
    // route for throwing an error
    .use(`/error`, mError);

export default xRoutes;