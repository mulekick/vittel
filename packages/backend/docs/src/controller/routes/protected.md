[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/routes/protected

# src/controller/routes/protected

Feature-specific express router.

## Remarks

- Scope : CONTROLLER / ROUTES.
- Routes that expose the protected API.

## Variables

### xProtected

```ts
const xProtected: Router;
```

Defined in: [src/controller/routes/protected.ts:21](https://github.com/mulekick/vittel/blob/37a2bd1e32f88747d55d69b67de69e392e6e005b/packages/backend/src/controller/routes/protected.ts#L21)

Mounts protected API middlewares on /protected

#### See

 - [Route for serving token](../middlewares/protected.md#mtoken)
 - [Protection middleware](../middlewares/protected.md#mprotection)
 - [Route to process file uploads](../middlewares/upload.md#mupload)
 - [Protected resources sit there](../middlewares/protected.md#mfallback)
