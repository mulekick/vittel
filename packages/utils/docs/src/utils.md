[**@vittel/utils**](../README.md)

***

[@vittel/utils](../README.md) / src/utils

# src/utils

Node.js based shared utility functions.

## Table of contents

* [Remarks](#remarks)
* [1. Async local storage](#1-async-local-storage)
* [2. Async local storage middlewares](#2-async-local-storage-middlewares)
* [3. Try / catch wrappers](#3-try--catch-wrappers)
* [4. Logging](#4-logging)
* [5. Data access](#5-data-access)

## Remarks

* Scope : GENERAL
* Utility functions that cover all app layers (controller, domain and data).
* Centralized in a dedicated package to avoid code redundancy across packages.
* This module can only be imported in node.js based packages since it imports node primitives.
* TODO : export a wrapper class for db client, pass client instance to the contructor :
  1. Client is instantiated in backend package data layer (npm packages do not include configs)
  2. Data accessors are implemented as methods of the wrapper class, `DataAccessor` type may become superfluous.

## 1. Async local storage

* Manages the persistence of values during async call chains that may involve multiple services.

### CORRELATION\_ID\_KEY

```ts
const CORRELATION_ID_KEY: "x-correlation-id";
```

Defined in: [src/utils.ts:49](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L49)

Key used for storing correlation ID in async local storage.

#### Remarks

* Used as an http header as well as for cross service requests.

***

### asyncLocalStorage

```ts
const asyncLocalStorage: AsyncLocalStorage<Map<string, string>>;
```

Defined in: [src/utils.ts:58](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L58)

Init async local storage.

#### Remarks

* Init with a map object to persist multiple values if needed.
* Does not need specific configuration so it can be created as a side effect.

***

### setCorrelationId()

```ts
function setCorrelationId(id): void;
```

Defined in: [src/utils.ts:66](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L66)

Set the correlation id for current async calls chain.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | `undefined` | Current correlation id if the call chain was initiated from another service. |

#### Returns

`void`

#### Throws

Throws a generic error if async local storage is not initialized.

***

### correlationId()

```ts
function correlationId(): string;
```

Defined in: [src/utils.ts:79](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L79)

Retrieve the correlation id for current async calls chain.

#### Returns

`string`

Current correlation id.

#### Throws

Throws a generic error if async local storage is not initialized or if the id is not found.

## 2. Async local storage middlewares

* Framework-specific middlewares enabling async local storage support for incoming requests.

### setRequestLocalsExpress

```ts
const setRequestLocalsExpress: RequestHandler;
```

Defined in: [src/utils.ts:96](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L96)

Express middleware that exposes async local storage to incoming http requests.

#### Remarks

* Pass request header in the event the initial transaction originates from another service.
* `route` is passed only for typescript compliance, should be painless but beware.

***

### setRequestLocalsFakeMessageQueue()

```ts
function setRequestLocalsFakeMessageQueue(next, ...args): void;
```

Defined in: [src/utils.ts:132](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L132)

Middleware-like hook function that exposes async local storage to the message queue.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `next` | [`MessageHandler`](mocks.md#messagehandler) |
| ...`args` | \[[`FakeMessageQueueClient`](mocks.md#fakemessagequeueclient), `unknown`] |

#### Returns

`void`

#### Remarks

* Mimics the behavior of express middlewares, called for each incoming messages.
* In the event some transaction id is included in the message, it can be assigned to h.
* Message handler needs to be updated once an actual message queue is used.

## 3. Try / catch wrappers

* Wrapper functions that add error handling support to framework-specific middlewares.

### wrapMiddlewareExpress()

```ts
function wrapMiddlewareExpress(mid): RequestHandler;
```

Defined in: [src/utils.ts:113](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L113)

Sync wrapper that adds error handling support to express middlewares.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mid` | `RequestHandler` | Original express middleware (sync or async). |

#### Returns

`RequestHandler`

The wrapped middleware.

#### Remarks

* Uses a functional programming pattern (higher order function).

***

### wrapMiddlewareFakeMessageQueue()

```ts
function wrapMiddlewareFakeMessageQueue(mid): MessageHandler;
```

Defined in: [src/utils.ts:149](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L149)

Sync wrapper that adds error handling support to message queue middlewares.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mid` | [`MessageHandler`](mocks.md#messagehandler) | The message queue middleware (sync or async). |

#### Returns

[`MessageHandler`](mocks.md#messagehandler)

The wrapped middleware.

#### Remarks

* Uses a functional programming pattern (higher order function).
* Middleware type needs to be updated once an actual message queue is used.

## 4. Logging

* Provides centralized, feature agnostic logging features.

### logWritables

```ts
const logWritables: DestinationStream;
```

Defined in: [src/utils.ts:168](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L168)

Specify outputs to write logs to using pino transports.

#### Remarks

* Does not need specific configuration so it can be created as a side effect.
* Prints logs to :
  1. Local log file / observability service endpoint etc.
  2. Stdout, use options to prettify the output.

***

### logger

```ts
const logger: Logger;
```

Defined in: [src/utils.ts:195](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L195)

Constant that will instantiate the pino logger and pipe it to the outputs.

#### Remarks

* Does not need specific configuration so it can be created as a side effect.

***

### httpLogger

```ts
const httpLogger: HttpLogger;
```

Defined in: [src/utils.ts:203](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L203)

Wrapper around the main logger for use as an express logging middleware.

#### Remarks

* Does not need specific configuration so it can be created as a side effect.

## 5. Data access

* Allows exported shared database access functions.
* Functions are imported in packages and bound to package-specific clients using the "data accessor" pattern.

### createDbClient()

```ts
function createDbClient(databaseConfig): FakeDatabaseClient;
```

Defined in: [src/utils.ts:223](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L223)

Create database client instance

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `databaseConfig` | `Record`<`string`, `unknown`> |

#### Returns

[`FakeDatabaseClient`](mocks.md#fakedatabaseclient)

***

### getRandomData()

```ts
function getRandomData(dbClient): Promise<string>;
```

Defined in: [src/utils.ts:232](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L232)

Emulate database read (public)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `dbClient` | [`FakeDatabaseClient`](mocks.md#fakedatabaseclient) |

#### Returns

`Promise`<`string`>

***

### getPublicData()

```ts
function getPublicData(dbClient): string;
```

Defined in: [src/utils.ts:238](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L238)

Emulate database read (public)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `dbClient` | [`FakeDatabaseClient`](mocks.md#fakedatabaseclient) |

#### Returns

`string`

***

### getProtectedData()

```ts
function getProtectedData(dbClient): string;
```

Defined in: [src/utils.ts:244](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L244)

Emulate database read (protected)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `dbClient` | [`FakeDatabaseClient`](mocks.md#fakedatabaseclient) |

#### Returns

`string`

***

### getWritableStreamToFile()

```ts
function getWritableStreamToFile(dbClient): WriteStream;
```

Defined in: [src/utils.ts:250](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/utils/src/utils.ts#L250)

Create a writable stream

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `dbClient` | [`FakeDatabaseClient`](mocks.md#fakedatabaseclient) |

#### Returns

`WriteStream`
