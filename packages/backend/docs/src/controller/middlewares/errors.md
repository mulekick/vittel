[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/middlewares/errors

# src/controller/middlewares/errors

Feature-specific express middleware.

## Table of contents

* [Remarks](#remarks)
* [Variables](#variables)

## Remarks

* Scope : CONTROLLER / MIDDLEWARES.
* Middlewares that call the error handling patterns API and use middleware wrapper for error routing.

## Variables

### mThrowError

```ts
const mThrowError: RequestHandler;
```

Defined in: [src/controller/middlewares/errors.ts:20](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/backend/src/controller/middlewares/errors.ts#L20)

Sync: trigger error in domain

#### See

[Throw error (sync)](../../domain/transactions/errors.md#throwerror)

***

### mEmitError

```ts
const mEmitError: RequestHandler;
```

Defined in: [src/controller/middlewares/errors.ts:31](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/backend/src/controller/middlewares/errors.ts#L31)

Async: trigger error in domain, event emitter emits error, promise rejects

#### See

[Emit error (async)](../../domain/transactions/errors.md#emiterror)
