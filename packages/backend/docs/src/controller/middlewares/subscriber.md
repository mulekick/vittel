[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/controller/middlewares/subscriber

# src/controller/middlewares/subscriber

Feature-specific message queue subscriber.

## Remarks

- Scope : CONTROLLER / MIDDLEWARES.
- Uses a node.js interval to emulate messages arriving on a message queue.
- Passing callback functions to the domain enforces strict isolation from the controller.
- Use bind to create callbacks and pass the mocked message queue as first argument.

## Functions

### mProcessMessage()

```ts
function mProcessMessage(mq, msg): Promise<void>;
```

Defined in: [src/controller/middlewares/subscriber.ts:40](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/controller/middlewares/subscriber.ts#L40)

Sync message processing middleware

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `mq` | `FakeMessageQueue` |
| `msg` | `unknown` |

#### Returns

`Promise`\<`void`\>

#### See

[Process incoming messages](../../domain/transactions/messages.md#processfakeevent)

***

### subscribe()

```ts
function subscribe(): void;
```

Defined in: [src/controller/middlewares/subscriber.ts:62](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/controller/middlewares/subscriber.ts#L62)

Simulate incoming messages

#### Returns

`void`
