[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/middlewares/errors

# src/controller/middlewares/errors

Feature-specific express middleware.

## Remarks

- Scope : CONTROLLER / MIDDLEWARES.
- Middlewares that call the error handling patterns API and use middleware wrapper for error routing.

## Variables

### mThrowErrorSync

```ts
const mThrowErrorSync: RequestHandler;
```

Defined in: [src/controller/middlewares/errors.ts:22](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/controller/middlewares/errors.ts#L22)

Sync: trigger error in domain

#### See

[Throw error (sync)](../../domain/transactions/errors.md#throwerrorsync)

***

### mEmitErrorAsync

```ts
const mEmitErrorAsync: RequestHandler;
```

Defined in: [src/controller/middlewares/errors.ts:33](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/controller/middlewares/errors.ts#L33)

Async: trigger error in domain, event emitter emits error, promise rejects

#### See

[Emit error (async)](../../domain/transactions/errors.md#emiterrorasync)
