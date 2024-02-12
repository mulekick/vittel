// import modules
import {RequestHandler} from "express";
import formidable from "formidable";
import config from "../config.ts";

const
    // destructure config values
    {dirName, APP_UPLOAD_DIR, APP_MAX_UPLOAD_SIZE} = config,
    // file upload middleware
    // async I/O operation requires try...catch in express 4
    mUpload:RequestHandler = async(req, res, next) => {
        // form parsing cannot be assessed to be business agnostic, there's also fields
        // in the form that have to be processed according to business logic, that's why
        // I opted to keep the form processing inside a middleware over using a helper ...
        try {

            const
                // rewrite handling of uploads following formidable 3xx breaking changes ...
                [ , files ] = await formidable({
                    keepExtensions: true,
                    allowEmptyFiles: false,
                    // max upload size
                    maxFileSize: APP_MAX_UPLOAD_SIZE * 1024,
                    // server upload directory (located in the same directory as the server file)
                    uploadDir: `${ dirName }/${ APP_UPLOAD_DIR }`,
                    // preserve original file name if possible (existing files will be overwritten ...)
                    filename: (n, e, p):string => p.originalFilename || `${ n }.${ e }`
                })
                    // parse request
                    .parse(req),

                // retrieve first uploaded file
                uploadedFile = files[Object.keys(files)[0]] || [];

            if (uploadedFile.length === 0)
                // upload failed ...
                throw new Error(`no file was uploaded.`);

            return res
                // send response
                .status(200)
                // .redirect(`/`);
                .send(`uploaded ${ uploadedFile[0].originalFilename }, ${ uploadedFile[0].size } bytes`);

        } catch (err:unknown) {
            // delegate to error handling middleware
            return next(err);
        }
    };

export default mUpload;