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

Defined in: [src/controller/routes/errors.ts:18](https://github.com/mulekick/vittel/blob/ca70442e6751444b45d7b40abefb56b3660f57ae/packages/backend/src/controller/routes/errors.ts#L18)

Mounts error handling patterns API middlewares on /error

#### See

* [Route for throwing an error](../middlewares/errors.md#mthrowerror)
* [Route for emitting an error](../middlewares/errors.md#memiterror)
