// import modules
import {Router} from "express";

// import middlewares
import xPublic from "./public.ts";
import xProtected from "./protected.ts";

// eslint-disable-next-line new-cap
const xRoutes: Router = Router();

// mount specific routers and middlewares to a single entrypoint for the server to use
xRoutes
    // route for serving public data
    .use(`/public`, xPublic)
    // route for serving protected data
    .use(`/protected`, xProtected);

export default xRoutes;