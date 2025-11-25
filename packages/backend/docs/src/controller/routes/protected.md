[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/routes/protected

# src/controller/routes/protected

Feature-specific express router.

## Table of contents

* [Remarks](#remarks)
* [Variables](#variables)

## Remarks

* Scope : CONTROLLER / ROUTES.
* Routes that expose the protected API.

## Variables

### xProtected

```ts
const xProtected: Router;
```

Defined in: [src/controller/routes/protected.ts:23](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/backend/src/controller/routes/protected.ts#L23)

Mounts protected API middlewares on /protected

#### See

* [Route for serving token](../middlewares/protected.md#mtoken)
* [Protection middleware](../middlewares/protected.md#mprotection)
* [Route to process file uploads](../middlewares/upload.md#mupload)
* [Protected resources sit there](../middlewares/protected.md#mfallback)
