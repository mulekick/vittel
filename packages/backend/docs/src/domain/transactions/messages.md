[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/domain/transactions/messages

# src/domain/transactions/messages

Domain feature that involve message-related processing.

## Remarks

- Scope : DOMAIN / TRANSACTIONS.
- Domain processing can involve calls to the data layer or not.
- Results will be parsed and returned if valid, or and error will be thrown.
- Do not import controller layer modules here to remain framework agnostic.

## Type Aliases

### dataProcessedCallback()

```ts
type dataProcessedCallback = (message) => void;
```

Defined in: [src/domain/transactions/messages.ts:34](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/transactions/messages.ts#L34)

User processed event callback function type
- Exported so the controller objects can bind to it.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `unknown` |

#### Returns

`void`

***

### dataPersistedCallback()

```ts
type dataPersistedCallback = (message) => void;
```

Defined in: [src/domain/transactions/messages.ts:40](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/transactions/messages.ts#L40)

User processed event callback function type
- Exported so the controller objects can bind to it.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `unknown` |

#### Returns

`void`

## Functions

### processFakeEvent()

```ts
function processFakeEvent(
   message, 
   onProcessed, 
onPersisted): Promise<void>;
```

Defined in: [src/domain/transactions/messages.ts:48](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/transactions/messages.ts#L48)

Async: process incoming messages
- The domain parses and processes the contents of incoming messages.
- It then passes results to a callback specific to the type of event received.
- Thus, domain-specific events need **not** to be imported in the controller.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `unknown` |
| `onProcessed` | [`dataProcessedCallback`](#dataprocessedcallback) |
| `onPersisted` | [`dataPersistedCallback`](#datapersistedcallback) |

#### Returns

`Promise`\<`void`\>
