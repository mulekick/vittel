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

## Classes

### EventDrivenObject

Defined in: [src/domain/transactions/errors.ts:29](https://github.com/mulekick/vittel/blob/37a2bd1e32f88747d55d69b67de69e392e6e005b/packages/backend/src/domain/transactions/errors.ts#L29)

Template clas for event-driven domain processing.

#### Remarks

- This class is a template for how to handle processing and error routing in event-driven features.
- This class creates objects that emit `error` events which are routed in the same fashion as other errors.

#### Extends

- `EventEmitter`

#### Constructors

##### Constructor

```ts
new EventDrivenObject(options?): EventDrivenObject;
```

Defined in: ../../node\_modules/@types/node/events.d.ts:134

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `EventEmitterOptions` |

###### Returns

[`EventDrivenObject`](#eventdrivenobject)

###### Inherited from

```ts
EventEmitter.constructor
```

#### Methods

##### startProcessing()

```ts
startProcessing(): Promise<void>;
```

Defined in: [src/domain/transactions/errors.ts:47](https://github.com/mulekick/vittel/blob/37a2bd1e32f88747d55d69b67de69e392e6e005b/packages/backend/src/domain/transactions/errors.ts#L47)

Async: throws a domain error during processing, used for error handling patterns benchmarking.

###### Returns

`Promise`\<`void`\>

##### process()

```ts
process(): Promise<string>;
```

Defined in: [src/domain/transactions/errors.ts:61](https://github.com/mulekick/vittel/blob/37a2bd1e32f88747d55d69b67de69e392e6e005b/packages/backend/src/domain/transactions/errors.ts#L61)

Sync: returns a promise that will resolve with the result of some event driven processing.

###### Returns

`Promise`\<`string`\>

#### Events

| Event | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="error"></a> `ERROR` | `readonly` | `"error"` | Emitted when processing encounters an error. | [src/domain/transactions/errors.ts:35](https://github.com/mulekick/vittel/blob/37a2bd1e32f88747d55d69b67de69e392e6e005b/packages/backend/src/domain/transactions/errors.ts#L35) |
| <a id="done"></a> `DONE` | `readonly` | `"done"` | Emitted once processing is done. | [src/domain/transactions/errors.ts:41](https://github.com/mulekick/vittel/blob/37a2bd1e32f88747d55d69b67de69e392e6e005b/packages/backend/src/domain/transactions/errors.ts#L41) |

## Functions

### throwError()

```ts
function throwError(): string;
```

Defined in: [src/domain/transactions/errors.ts:73](https://github.com/mulekick/vittel/blob/37a2bd1e32f88747d55d69b67de69e392e6e005b/packages/backend/src/domain/transactions/errors.ts#L73)

Sync: throw error, route to error handler

#### Returns

`string`

***

### emitError()

```ts
function emitError(): Promise<string>;
```

Defined in: [src/domain/transactions/errors.ts:82](https://github.com/mulekick/vittel/blob/37a2bd1e32f88747d55d69b67de69e392e6e005b/packages/backend/src/domain/transactions/errors.ts#L82)

Async: emit error, route to error handler
- Domain transaction initializes an event emitter instance
- Transaction will be fulfilled once a specific event is emitted

#### Returns

`Promise`\<`string`\>
