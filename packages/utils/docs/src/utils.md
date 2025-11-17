[**@vittel/utils**](../README.md)

***

[@vittel/utils](../README.md) / src/utils

# src/utils

Node.js based shared utility functions.

## Table of contents

* [Remarks](#remarks)
* [Async local storage](#async-local-storage)
* [Async local storage middlewares](#async-local-storage-middlewares)
* [Logging](#logging)
* [Miscellaneous](#miscellaneous)
* [Other](#other)
* [Try / catch wrappers](#try--catch-wrappers)

## Remarks

* Scope : GENERAL
* Utility functions that cover all app layers (controller, domain and data).
* Centralized in a dedicated package to avoid code redundancy across packages.
* Domain-specific functions will be declared at the package scope.
* This module can only be imported in node.js based packages since it imports node primitives.

## Async local storage

* Manages the persistence of values during async call chains that may involve multiple services.

### CORRELATION\_ID\_KEY

```ts
const CORRELATION_ID_KEY: "x-correlation-id";
```

Defined in: [src/utils.ts:51](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L51)

Key used for storing correlation ID in the async local storage.

#### Remarks

* Used as an http header as well for cross service requests.

***

### asyncLocalStorage

```ts
const asyncLocalStorage: AsyncLocalStorage<Map<string, string>>;
```

Defined in: [src/utils.ts:59](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L59)

Init async local storage.

#### Remarks

* Init with a map object to persist multiple values if needed.

***

### setCorrelationId()

```ts
function setCorrelationId(id): void;
```

Defined in: [src/utils.ts:67](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L67)

Sync function that sets the correlation id for current async calls chain.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `undefined` | `string` | The current correlation id if the call chain was initiated from another service. |

#### Returns

`void`

#### Throws

Throws a generic error if async local storage is not initialized.

***

### correlationId()

```ts
function correlationId(): string;
```

Defined in: [src/utils.ts:80](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L80)

Sync function that retrieves the correlation id for current async calls chain.

#### Returns

`string`

The current correlation id.

#### Throws

Throws a generic error if async local storage is not initialized or if the id is not found.

## Async local storage middlewares

* Framework-specific middlewares enabling async local storage support for incoming requests.

### setRequestLocalsExpress

```ts
const setRequestLocalsExpress: RequestHandler;
```

Defined in: [src/utils.ts:97](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L97)

Express middleware that exposes async local storage to incoming http requests.

#### Remarks

* Pass request header in the event the initial transaction originates from another service.
* `route` is passed only for typescript compliance, should be painless but beware.

***

### setRequestLocalsFakeMessageQueue()

```ts
function setRequestLocalsFakeMessageQueue(next, ...args): Promise<void>;
```

Defined in: [src/utils.ts:132](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L132)

Middleware-like function that exposes async local storage to the message queue.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `next` | [`MessageHandler`](#messagehandler) |
| ...`args` | \[[`FakeMessageQueue`](#fakemessagequeue), `unknown`] |

#### Returns

`Promise`<`void`>

#### Remarks

* Mimics the behavior of express middlewares, called for each incoming messages.
* In the event some transaction id is included in the message, it can be assigned to h.
* Message handler needs to be updated once an actual message queue is used.

## Logging

* Provides centralized, feature agnostic logging features.

### logWritables

```ts
const logWritables: DestinationStream;
```

Defined in: [src/utils.ts:166](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L166)

Specify outputs to write logs to using pino transports.

#### Remarks

1. Local log file / observability service endpoint etc, discard for now.
2. Stdout, use options to prettify the output.

***

### logger

```ts
const logger: Logger;
```

Defined in: [src/utils.ts:188](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L188)

Constant that will instantiate the pino logger and pipe it to the outputs.

***

### httpLogger

```ts
const httpLogger: HttpLogger;
```

Defined in: [src/utils.ts:194](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L194)

Wrapper around the main logger for use as an express logging middleware.

## Miscellaneous

* Provides centralized, feature agnostic miscellaneous features.

### FakeMessageQueue

Defined in: [src/utils.ts:226](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L226)

Mocks a message queue

* Generates messages and mocks the send() method of an actual message queue.
* Imported by the controller layer of the backend service so as to subscribe to it.
* This class can be discarded once a genuine message queue / no message queue at all is used.

#### Extends

* `EventEmitter`

#### Constructors

##### Constructor

```ts
new FakeMessageQueue(options?): FakeMessageQueue;
```

Defined in: ../../node\_modules/@types/node/events.d.ts:134

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `EventEmitterOptions` |

###### Returns

[`FakeMessageQueue`](#fakemessagequeue)

###### Inherited from

```ts
EventEmitter.constructor
```

#### Methods

##### createMessage()

```ts
static createMessage(): {
};
```

Defined in: [src/utils.ts:247](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L247)

Sync: creates a fake incoming message.

###### Returns

```ts
{
}
```

##### send()

```ts
send(channel, message): void;
```

Defined in: [src/utils.ts:258](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L258)

Sync: simulates sending a message on the queue.

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `channel` | `string` |
| `message` | `unknown` |

###### Returns

`void`

#### Events

| Event | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="message"></a> `MESSAGE` | `readonly` | `"message"` | Emitted when a new message arrives on the message queue. | [src/utils.ts:232](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L232) |

## Other

### MessageHandler

```ts
type MessageHandler = MessageHandler;
```

Defined in: [src/utils.ts:216](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L216)

Signature for message queue middlewares.

#### Remarks

* Needs to be updated once a genuine message queue / no message queue at all is used.

## Try / catch wrappers

* Wrapper functions that add error handling support to framework-specific middlewares.

### wrapMiddlewareExpress()

```ts
function wrapMiddlewareExpress(mid): RequestHandler;
```

Defined in: [src/utils.ts:113](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L113)

Sync wrapper that adds error handling support to express middlewares.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mid` | `RequestHandler` | The original express middleware (sync or async). |

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

Defined in: [src/utils.ts:149](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/utils/src/utils.ts#L149)

Sync wrapper that adds error handling support to message queue middlewares.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mid` | [`MessageHandler`](#messagehandler) | The message queue middleware (sync or async). |

#### Returns

[`MessageHandler`](#messagehandler)

The wrapped middleware.

#### Remarks

* Uses a functional programming pattern (higher order function).
* Middleware type needs to be updated once an actual message queue is used.
