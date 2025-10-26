[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/middlewares/upload

# src/controller/middlewares/upload

Feature-specific express middleware.

## Remarks

- Scope : CONTROLLER / MIDDLEWARES.
- Middlewares that call the file upload API and use middleware wrapper for error routing.

## Variables

### mUpload

```ts
const mUpload: RequestHandler;
```

Defined in: [src/controller/middlewares/upload.ts:29](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/controller/middlewares/upload.ts#L29)

Async file upload middleware
- Advanced example of strict isolation of the controller layer from the domain layer
- The `Uploader` object (domain) consumes the readable stream returned by busboy (controller)
- See https://github.com/mscdex/busboy?tab=readme-ov-file#special-parser-stream-events
- Using a class allows for additional processing (read the total upload size)

#### See

 - [Upload a file](../../domain/transactions/upload.md#createfileuploader)
 - [Get upload results](../../domain/transactions/upload.md#getuploadresult)
