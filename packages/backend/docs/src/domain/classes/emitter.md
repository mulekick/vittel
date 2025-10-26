[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/domain/classes/emitter

# src/domain/classes/emitter

Event emitter based class for demonstration.

## Remarks

- Scope : DOMAIN / CLASSES.
- This class is used to demonstrate error routing capabilities at the app level.
- This class creates objects that emit `error` events which are routed in the same fashion as other errors.

## Classes

### DomainEventEmitter

Defined in: [src/domain/classes/emitter.ts:20](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/classes/emitter.ts#L20)

Use an event emitter to handle domain transaction

#### Extends

- `EventEmitter`

#### Constructors

##### Constructor

```ts
new DomainEventEmitter(options?): DomainEventEmitter;
```

Defined in: ../../node\_modules/@types/node/events.d.ts:134

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `EventEmitterOptions` |

###### Returns

[`DomainEventEmitter`](#domaineventemitter)

###### Inherited from

```ts
EventEmitter.constructor
```

#### Methods

##### startProcessing()

```ts
startProcessing(): Promise<void>;
```

Defined in: [src/domain/classes/emitter.ts:38](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/classes/emitter.ts#L38)

Async: throws a domain error during processing, used for error handling patterns benchmarking purposes.

###### Returns

`Promise`\<`void`\>

##### process()

```ts
process(): Promise<string>;
```

Defined in: [src/domain/classes/emitter.ts:52](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/classes/emitter.ts#L52)

Sync: returns a promise that will resolve with the result of some event driven processing.

###### Returns

`Promise`\<`string`\>

#### Events

| Event | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="error"></a> `ERROR` | `readonly` | `"error"` | Emitted when processing encounters an error. | [src/domain/classes/emitter.ts:26](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/classes/emitter.ts#L26) |
| <a id="done"></a> `DONE` | `readonly` | `"done"` | Emitted once processing is done. | [src/domain/classes/emitter.ts:32](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/classes/emitter.ts#L32) |
