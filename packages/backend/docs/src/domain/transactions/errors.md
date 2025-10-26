[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/domain/transactions/errors

# src/domain/transactions/errors

Features that involve handling and routing of errors.

## Remarks

- Scope : DOMAIN / TRANSACTIONS.
- Domain features that demonstrate possible error handling patterns.
- Errors can be thrown in sync or async calls or emitted as `error` events.
- In both cases, they will be routed to the general event handler for the app.

## See

handleError \| General error handler

## Functions

### throwErrorSync()

```ts
function throwErrorSync(): string;
```

Defined in: [src/domain/transactions/errors.ts:23](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/transactions/errors.ts#L23)

Sync: throw error, route to error handler

#### Returns

`string`

***

### emitErrorAsync()

```ts
function emitErrorAsync(): Promise<string>;
```

Defined in: [src/domain/transactions/errors.ts:33](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/transactions/errors.ts#L33)

Async: emit error, route to error handler
- Domain transaction initializes an event emitter instance
- Transaction will be fulfilled once a specific event is emitted

#### Returns

`Promise`\<`string`\>

#### See

[Error emitting object class](../classes/emitter.md#domaineventemitter)
