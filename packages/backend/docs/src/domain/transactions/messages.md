[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/domain/transactions/messages

# src/domain/transactions/messages

Domain feature that involve message-related processing.

## Table of contents

* [Remarks](#remarks)
* [Type Aliases](#type-aliases)
* [Functions](#functions)

## Remarks

* Scope : DOMAIN / TRANSACTIONS.
* Domain processing can involve calls to the data layer or not.
* Results will be parsed and returned if valid, or and error will be thrown.
* Do not import controller layer modules here to remain framework agnostic.

## Type Aliases

### onDataProcessed()

```ts
type onDataProcessed = (message) => void;
```

Defined in: [src/domain/transactions/messages.ts:37](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/backend/src/domain/transactions/messages.ts#L37)

Expose "data processed" function type to the controller

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `unknown` |

#### Returns

`void`

***

### onDataPersisted()

```ts
type onDataPersisted = (message) => void;
```

Defined in: [src/domain/transactions/messages.ts:42](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/backend/src/domain/transactions/messages.ts#L42)

Expose "data persisted" function type to the controller

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

Defined in: [src/domain/transactions/messages.ts:50](https://github.com/mulekick/vittel/blob/78a0d57403bdeea5895e8f76174b171231a61b3c/packages/backend/src/domain/transactions/messages.ts#L50)

Async: process incoming messages

* The domain parses and processes the contents of incoming messages.
* It then passes results to a callback specific to the type of event received.
* Thus, domain-specific events need **not** to be imported in the controller.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `unknown` |
| `onProcessed` | [`onDataProcessed`](#ondataprocessed) |
| `onPersisted` | [`onDataPersisted`](#ondatapersisted) |

#### Returns

`Promise`<`void`>
