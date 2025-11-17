[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/routes/public

# src/controller/routes/public

Feature-specific express router.

## Table of contents

* [Remarks](#remarks)
* [Variables](#variables)

## Remarks

* Scope : CONTROLLER / ROUTES.
* Routes that expose the public API.

## Variables

### xPublic

```ts
const xPublic: Router;
```

Defined in: [src/controller/routes/public.ts:18](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/backend/src/controller/routes/public.ts#L18)

Mounts public API middlewares on /public

#### See

* [Route for fetching public data](../middlewares/public.md#mfetch)
* [Fallback route for GET](../middlewares/public.md#mfallback)
