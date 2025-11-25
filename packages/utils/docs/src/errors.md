[**@vittel/utils**](../README.md)

***

[@vittel/utils](../README.md) / src/errors

# src/errors

Layer-agnostic errors management.

## Table of contents

* [Remarks](#remarks)
* [Classes](#classes)
* [Functions](#functions)

## Remarks

* Scope : GENERAL
* Custom error classes and global error handlers.
* Manages the routing of errors across all app layers to a centralized location.
* All errors, exceptions and rejected promises will eventually be routed to those handlers.
* This module can only be imported in node.js based packages since it imports node primitives.

## Classes

### DomainError

Defined in: [src/errors.ts:36](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/errors.ts#L36)

Custom error class for identified domain errors.

#### Remarks

* Any error happening in an external library will be forwarded as is to the error handler.

#### Extends

* `Error`

#### Implements

* `TransactionError`

#### Constructors

##### Constructor

```ts
new DomainError(
   message, 
   type, 
   payload): DomainError;
```

Defined in: [src/errors.ts:39](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/errors.ts#L39)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |
| `type` | `domainErrors` |
| `payload` | `unknown` |

###### Returns

[`DomainError`](#domainerror)

###### Overrides

```ts
Error.constructor
```

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="type"></a> `type` | `readonly` | `domainErrors` | Domain error that occured during the transaction. | [src/errors.ts:37](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/errors.ts#L37) |
| <a id="payload"></a> `payload` | `readonly` | `unknown` | Payload associated with the error, unrelated to the original transaction payload. | [src/errors.ts:38](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/errors.ts#L38) |

***

### UnhandledRejectionError

Defined in: [src/errors.ts:56](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/errors.ts#L56)

Custom error class for unhandled rejected promises.

#### Remarks

* Restores the original stack of the error the promise rejected with.
* Used only in the server unhandled rejections handler.

#### Extends

* `Error`

#### Implements

* `AsyncError`

#### Constructors

##### Constructor

```ts
new UnhandledRejectionError(
   message, 
   id, 
   stack): UnhandledRejectionError;
```

Defined in: [src/errors.ts:58](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/errors.ts#L58)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |
| `id` | `string` |
| `stack` | `string` | `undefined` |

###### Returns

[`UnhandledRejectionError`](#unhandledrejectionerror)

###### Overrides

```ts
Error.constructor
```

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `readonly` | `string` | Correlation id for the async call chains where the promise rejected. | [src/errors.ts:57](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/errors.ts#L57) |

## Functions

### handleError()

```ts
function handleError(err): Promise<void>;
```

Defined in: [src/errors.ts:74](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/errors.ts#L74)

General error handler: async function for centralized and consistent error handling.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `err` | `unknown` | Error to process (prefer unknown to not let requests time out). |

#### Returns

`Promise`<`void`>

#### Remarks

* Log warn for domain errors since they were anticipated by construction
* Log error for any unanticipated error (parsing, runtime, etc)

***

### unhandledRejection()

```ts
function unhandledRejection(err, p): void;
```

Defined in: [src/errors.ts:95](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/errors.ts#L95)

Route unhandled promise rejections to last resort handler.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `err` | `unknown` | Error to process. |
| `p` | `Promise`<`unknown`> | The promise that rejected with this error. |

#### Returns

`void`

#### Remarks

* Discards rejected promise, logs and rethrows.

***

### uncaughtException()

```ts
function uncaughtException(err, exceptionOrigin): void;
```

Defined in: [src/errors.ts:108](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/errors.ts#L108)

Log the exception and exits in the event regular error handling throws (unhandled).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `err` | `unknown` | Error to process. |
| `exceptionOrigin` | `UncaughtExceptionOrigin` | The exception origin. |

#### Returns

`void`

#### Remarks

* Logs the exception with correlation id if available, then fails and exits.
