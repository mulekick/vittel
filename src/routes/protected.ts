// import modules
import {Router} from "express";

// import middlewares
import {mToken, mProtection, mFallback} from "../middlewares/protected.ts";

const
    // eslint-disable-next-line new-cap
    xProtected:Router = Router();

xProtected
    // token serving middleware
    .get(`/token`, mToken)
    // protection middleware
    .use(mProtection)
    // protected resources sit there
    .get(`*`, mFallback);

export default xProtected;