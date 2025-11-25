[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/domain/transactions/errors

# src/domain/transactions/errors

Features that involve handling and routing of errors.

## Table of contents

* [Remarks](#remarks)
* [See](#see)
* [Classes](#classes)
* [Functions](#functions)

## Remarks

* Scope : DOMAIN / TRANSACTIONS.
* Domain features that demonstrate possible error handling patterns.
* Errors can be thrown in sync or async calls or emitted as `error` events.
* In both cases, they will be routed to the general event handler for the app.

## See

handleError | General error handler

## Classes

### EventDrivenObject

Defined in: [src/domain/transactions/errors.ts:26](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/backend/src/domain/transactions/errors.ts#L26)

Template clas for event-driven domain processing.

#### Remarks

* Template for how to handle processing and error routing in event-driven features.
* This class creates objects that emit `error` events which are routed in the same fashion as other errors.

#### Extends

* `EventEmitter`

#### Constructors

##### Constructor

```ts
new EventDrivenObject(options?): EventDrivenObject;
```

Defined in: ../../node\_modules/@types/node/events.d.ts:101

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

Defined in: [src/domain/transactions/errors.ts:44](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/backend/src/domain/transactions/errors.ts#L44)

Throw a domain error during processing, used for error handling patterns benchmarking.

###### Returns

`Promise`<`void`>

##### process()

```ts
process(): Promise<string>;
```

Defined in: [src/domain/transactions/errors.ts:58](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/backend/src/domain/transactions/errors.ts#L58)

Returns a promise that will resolve with the result of some event driven processing.

###### Returns

`Promise`<`string`>

#### Events

| Event | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="error"></a> `ERROR` | `readonly` | `"error"` | Emitted when processing encounters an error. | [src/domain/transactions/errors.ts:32](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/backend/src/domain/transactions/errors.ts#L32) |
| <a id="done"></a> `DONE` | `readonly` | `"done"` | Emitted once processing is done. | [src/domain/transactions/errors.ts:38](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/backend/src/domain/transactions/errors.ts#L38) |

## Functions

### throwError()

```ts
function throwError(): string;
```

Defined in: [src/domain/transactions/errors.ts:70](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/backend/src/domain/transactions/errors.ts#L70)

Throw error, route to error handler

#### Returns

`string`

***

### emitError()

```ts
function emitError(): Promise<string>;
```

Defined in: [src/domain/transactions/errors.ts:80](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/backend/src/domain/transactions/errors.ts#L80)

Emit error, route to error handler

#### Returns

`Promise`<`string`>

#### Remarks

* Domain transaction initializes an event emitter instance
* Transaction will be fulfilled once a specific event is emitted
