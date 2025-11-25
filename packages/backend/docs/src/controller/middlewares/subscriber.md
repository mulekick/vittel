[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/middlewares/subscriber

# src/controller/middlewares/subscriber

Feature-specific message queue subscriber.

## Table of contents

* [Remarks](#remarks)
* [Variables](#variables)

## Remarks

* Scope : CONTROLLER / MIDDLEWARES.
* Passing callback functions to the domain enforces strict isolation from the controller.
* Use bind to create callbacks and pass the mocked message queue as first argument.

## Variables

### mProcessMessage

```ts
const mProcessMessage: MessageHandler;
```

Defined in: [src/controller/middlewares/subscriber.ts:40](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/backend/src/controller/middlewares/subscriber.ts#L40)

Message processing middleware

#### See

[Process incoming messages](../../domain/transactions/messages.md#processfakeevent)

#### Remarks

* Declare local callback functions and bind to the message queue
