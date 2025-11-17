[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/routes/errors

# src/controller/routes/errors

Feature-specific express router.

## Table of contents

* [Remarks](#remarks)
* [Variables](#variables)

## Remarks

* Scope : CONTROLLER / ROUTES.
* Routes that expose the error handling patterns API.

## Variables

### xErrors

```ts
const xErrors: Router;
```

Defined in: [src/controller/routes/errors.ts:18](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/backend/src/controller/routes/errors.ts#L18)

Mounts error handling patterns API middlewares on /error

#### See

* [Route for throwing an error](../middlewares/errors.md#mthrowerror)
* [Route for emitting an error](../middlewares/errors.md#memiterror)
