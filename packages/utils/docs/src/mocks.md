[**@vittel/utils**](../README.md)

***

[@vittel/utils](../README.md) / src/mocks

# src/mocks

Mock implementations of client libraries.

## Table of contents

* [Remarks](#remarks)
* [Classes](#classes)
* [Type Aliases](#type-aliases)

## Remarks

* Scope : GENERAL
* Message queue and database client mocks.
* Used to illustrate architecture patterns in the backend module.
* This module and relevant exports can be discarded once actual libraries are used.

## Classes

### FakeMessageQueueClient

Defined in: [src/mocks.ts:41](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/mocks.ts#L41)

Message queue mock

* Uses a node.js interval to emulate messages arriving on a message queue.
* Generates messages and mocks the send() method of an actual message queue.
* Imported by the controller layer of the backend service so as to subscribe to it.

#### Extends

* `EventEmitter`

#### Constructors

##### Constructor

```ts
new FakeMessageQueueClient(options?): FakeMessageQueueClient;
```

Defined in: ../../node\_modules/@types/node/events.d.ts:101

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `EventEmitterOptions` |

###### Returns

[`FakeMessageQueueClient`](#fakemessagequeueclient)

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

Defined in: [src/mocks.ts:62](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/mocks.ts#L62)

Creates a fake incoming message.

###### Returns

```ts
{
}
```

##### subscribe()

```ts
subscribe(): void;
```

Defined in: [src/mocks.ts:74](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/mocks.ts#L74)

Simulate incoming messages

###### Returns

`void`

##### send()

```ts
send(channel, message): void;
```

Defined in: [src/mocks.ts:84](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/mocks.ts#L84)

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
| <a id="message"></a> `MESSAGE` | `readonly` | `"message"` | Emitted when a new message arrives on the message queue. | [src/mocks.ts:47](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/mocks.ts#L47) |

***

### FakeDatabaseClient

Defined in: [src/mocks.ts:97](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/mocks.ts#L97)

Mocks a database client

* Generates messages and mocks the send() method of an actual message queue.
* Imported by the controller layer of the backend service so as to subscribe to it.
* This class can be discarded once a genuine message queue / no message queue at all is used.

#### Extends

* `EventEmitter`

#### Constructors

##### Constructor

```ts
new FakeDatabaseClient(options?): FakeDatabaseClient;
```

Defined in: ../../node\_modules/@types/node/events.d.ts:101

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `EventEmitterOptions` |

###### Returns

[`FakeDatabaseClient`](#fakedatabaseclient)

###### Inherited from

```ts
EventEmitter.constructor
```

#### Methods

##### connect()

```ts
connect(): void;
```

Defined in: [src/mocks.ts:108](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/mocks.ts#L108)

Sync: simulates database connectiob.

###### Returns

`void`

##### randomData()

```ts
randomData(): Promise<string>;
```

Defined in: [src/mocks.ts:118](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/mocks.ts#L118)

Async: emulates database read (public)

###### Returns

`Promise`<`string`>

##### publicData()

```ts
publicData(): string;
```

Defined in: [src/mocks.ts:129](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/mocks.ts#L129)

Sync: emulates database read (public)

###### Returns

`string`

##### protectedData()

```ts
protectedData(): string;
```

Defined in: [src/mocks.ts:137](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/mocks.ts#L137)

Sync: emulates database read (protected)

###### Returns

`string`

##### writableStreamToFile()

```ts
writableStreamToFile(): WriteStream;
```

Defined in: [src/mocks.ts:145](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/mocks.ts#L145)

Sync: process streamed data (discard to /dev/null)

###### Returns

`WriteStream`

#### Events

| Event | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="ready"></a> `READY` | `readonly` | `"ready"` | Emitted once the client connects to the database. | [src/mocks.ts:103](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/mocks.ts#L103) |

## Type Aliases

### MessageHandler

```ts
type MessageHandler = MessageHandler;
```

Defined in: [src/mocks.ts:32](https://github.com/mulekick/vittel/blob/9eb95fb689f4afe189275fb7b5a5cb3c905f7d40/packages/utils/src/mocks.ts#L32)

Signature for message queue middlewares.

#### Remarks

* Needs to be updated once a genuine message queue / no message queue at all is used.
