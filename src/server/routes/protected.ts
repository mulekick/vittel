// import modules
import {Router} from "express";

// import middlewares
import {mToken, mProtection, mFallback} from "../middlewares/protected.ts";
import mUpload from "../middlewares/upload.ts";

const
    // eslint-disable-next-line new-cap
    xProtected: Router = Router();

xProtected
    // route for serving token
    .get(`/token`, mToken)
    // protection middleware
    .use(mProtection)
    // route to process file uploads
    .post(`/upload`, mUpload)
    // protected resources sit there
    .get(`*`, mFallback);

export default xProtected;