[**@vittel/utils**](../README.md)

***

[@vittel/utils](../README.md) / src/utils

# src/utils

Node.js based shared utility functions.

## Remarks

- Scope : GENERAL
- Utility functions that cover all app layers (controller, domain and data).
- Centralized in a dedicated package to avoid code redundancy across packages.
- Domain-specific functions will be declared at the package scope.
- This module can only be imported in node.js based packages since it imports node primitives.

## Async local storage

- Manages the persistence of values during async call chains that may involve multiple services.

### CORRELATION\_ID\_KEY

```ts
const CORRELATION_ID_KEY: "x-correlation-id";
```

Defined in: [src/utils.ts:50](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L50)

Key used for storing correlation ID in the async local storage.

#### Remarks

- Used as an http header as well for cross service requests.

***

### asyncLocalStorage

```ts
const asyncLocalStorage: AsyncLocalStorage<Map<string, string>>;
```

Defined in: [src/utils.ts:58](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L58)

Init async local storage.

#### Remarks

- Init with a map object to persist multiple values if needed.

***

### setCorrelationId()

```ts
function setCorrelationId(id): void;
```

Defined in: [src/utils.ts:66](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L66)

Sync function that sets the correlation id for current async calls chain.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `undefined` \| `string` | The current correlation id if the call chain was initiated from another service. |

#### Returns

`void`

#### Throws

Throws a generic error if async local storage is not initialized.

***

### correlationId()

```ts
function correlationId(): string;
```

Defined in: [src/utils.ts:79](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L79)

Sync function that retrieves the correlation id for current async calls chain.

#### Returns

`string`

The current correlation id.

#### Throws

Throws a generic error if async local storage is not initialized or if the id is not found.

## Async local storage middlewares

- Framework-specific middlewares enabling async local storage support for incoming requests.

### setRequestLocalsExpress

```ts
const setRequestLocalsExpress: RequestHandler;
```

Defined in: [src/utils.ts:128](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L128)

Express middleware that exposes async local storage to incoming http requests.

#### Remarks

- Pass request header in the event the initial transaction originates from another service.
- `route` is passed only for typescript compliance, should be painless but beware.

## Async local storage wrappers

- Wrapper functions that add async local storage support to controller layer middlewares.

### wrapAsyncContextExpress

```ts
const wrapAsyncContextExpress: AsyncContextWrapper<NextFunction>;
```

Defined in: [src/utils.ts:99](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L99)

Sync wrapper that adds local storage support to functions initiating async call chains.

#### Param

The express middleware to wrap (sync or async).

#### Param

The current correlation id if the call chain was initiated from another service.

#### Returns

The wrapped middleware with async local storage support.

#### Remarks

- Uses a functional programming pattern (higher order function).
- Returned function must be awaited to trigger the calls chain.

***

### wrapAsyncContextFakeMessageQueue

```ts
const wrapAsyncContextFakeMessageQueue: AsyncContextWrapper<(...args) => Promise<void>>;
```

Defined in: [src/utils.ts:116](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L116)

Sync wrapper that adds local storage support to functions initiating async call chains.

#### Param

The message queue middleware to wrap (sync or async).

#### Param

The current correlation id if the call chain was initiated from another service.

#### Returns

The wrapped function with async local storage support.

#### Remarks

- Uses a functional programming pattern (higher order function).
- Returned function must be awaited to trigger the calls chain.

## Logging

- Provides centralized, feature agnostic logging features.

### logWritables

```ts
const logWritables: DestinationStream;
```

Defined in: [src/utils.ts:162](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L162)

Specify outputs to write logs to using pino transports.

#### Remarks

1. Local log file / observability service endpoint etc, discard for now.
2. Stdout, use options to prettify the output.

***

### logger

```ts
const logger: Logger;
```

Defined in: [src/utils.ts:184](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L184)

Constant that will instantiate the pino logger and pipe it to the outputs.

***

### httpLogger

```ts
const httpLogger: HttpLogger;
```

Defined in: [src/utils.ts:190](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L190)

Wrapper around the main logger for use as an express logging middleware.

## Miscellaneous

- Provides centralized, feature agnostic miscellaneous features.

### FakeMessageQueue

Defined in: [src/utils.ts:214](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L214)

Mocks a message queue
- Generates messages and mocks the send() method of an actual message queue.
- Imported by the controller layer of the backend service so as to subscribe to it.
- This class can be discarded once a genuine message queue / no message queue at all is used.

#### Extends

- `EventEmitter`

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

Defined in: [src/utils.ts:235](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L235)

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

Defined in: [src/utils.ts:246](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L246)

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
| <a id="message"></a> `MESSAGE` | `readonly` | `"message"` | Emitted when a new message arrives on the message queue. | [src/utils.ts:220](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L220) |

## Try / catch wrappers

- Wrapper functions that add error handling support to framework-specific middlewares.

### wrapMiddlewareExpress()

```ts
function wrapMiddlewareExpress(mid): RequestHandler;
```

Defined in: [src/utils.ts:141](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/utils/src/utils.ts#L141)

Sync wrapper that adds error handling support to express middlewares.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mid` | `RequestHandler` | The original express middleware (sync or async). |

#### Returns

`RequestHandler`

The wrapped middleware.

#### Remarks

- Uses a functional programming pattern (higher order function).
