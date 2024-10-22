// import modules
import formidable from "formidable";
import config from "../config.ts";

// import types
import type {RequestHandler} from "express";

const
    // destructure config values
    {dirName, APP_UPLOAD_DIR, APP_MAX_UPLOAD_SIZE} = config,
    // file upload middleware
    // async I/O operation requires try...catch in express 4
    mUpload: RequestHandler = async(req, res, next) => {
        // form parsing cannot be assessed to be business agnostic, there's also fields
        // in the form that have to be processed according to business logic, that's why
        // I opted to keep the form processing inside a middleware over using a helper ...
        try {

            // rewrite handling of uploads following formidable 3xx breaking changes ...
            const [ , files ] = await formidable({
                    keepExtensions: true,
                    allowEmptyFiles: false,
                    // max upload size
                    maxFileSize: APP_MAX_UPLOAD_SIZE * 1024,
                    maxTotalFileSize: APP_MAX_UPLOAD_SIZE * 1024,
                    // server upload directory (located in the same directory as the server file)
                    uploadDir: `${ dirName }/${ APP_UPLOAD_DIR }`,
                    // preserve original file name if possible (existing files will be overwritten ...)
                    filename: (n, e, p): string => p.originalFilename || `${ n }.${ e }`
                })
                    // parse request
                    .parse(req),

                // retrieve first uploaded file
                uploadedFile = files[Object.keys(files)[0]] || [];

            if (uploadedFile.length === 0)
                // upload failed ...
                throw new Error(`no file was uploaded.`);

            res
                // send response
                .status(200)
                .send(`uploaded ${ String(uploadedFile[0].originalFilename) }, ${ String(uploadedFile[0].size) } bytes`);
            // eslint compliance
            return undefined;

        } catch (err: unknown) {
            // delegate to error handling middleware
            next(err);
            // eslint compliance
            return undefined;
        }
    };

export default mUpload;