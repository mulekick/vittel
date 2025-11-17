[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/middlewares/subscriber

# src/controller/middlewares/subscriber

Feature-specific message queue subscriber.

## Table of contents

* [Remarks](#remarks)
* [Variables](#variables)
* [Functions](#functions)

## Remarks

* Scope : CONTROLLER / MIDDLEWARES.
* Uses a node.js interval to emulate messages arriving on a message queue.
* Passing callback functions to the domain enforces strict isolation from the controller.
* Use bind to create callbacks and pass the mocked message queue as first argument.

## Variables

### mProcessMessage

```ts
const mProcessMessage: MessageHandler;
```

Defined in: [src/controller/middlewares/subscriber.ts:40](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/backend/src/controller/middlewares/subscriber.ts#L40)

Sync message processing middleware

#### See

[Process incoming messages](../../domain/transactions/messages.md#processfakeevent)

## Functions

### subscribe()

```ts
function subscribe(): void;
```

Defined in: [src/controller/middlewares/subscriber.ts:61](https://github.com/mulekick/vittel/blob/3532f724925003c84ae885b0d804aa5aad6d7294/packages/backend/src/controller/middlewares/subscriber.ts#L61)

Simulate incoming messages

#### Returns

`void`
