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

Defined in: [src/controller/routes/public.ts:20](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/backend/src/controller/routes/public.ts#L20)

Mounts public API middlewares on /public

#### See

* [Route for fetching public data](../middlewares/public.md#mfetch)
* [Fallback route for GET](../middlewares/public.md#mfallback)
