[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/domain/classes/uploader

# src/domain/classes/uploader

Duplex stream based file uploading class.

## Remarks

- Scope : DOMAIN / CLASSES.
- This class is used to demonstrate how to process data streams in addition to objects.
- This class exposes a writable stream to the controller layer to receive the uploaded file.
- This class exposes a readable stream to the data layer to persist the uploaded file.
- Additional processing can be implemented in the stream methods (see below).
- Working with streams allows the domain layer to remain framework and database agnostic.

## Classes

### Uploader

Defined in: [src/domain/classes/uploader.ts:33](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/classes/uploader.ts#L33)

Sync: create duplex stream to route uploads to the data layer ...

#### Extends

- `Duplex`

#### Constructors

##### Constructor

```ts
new Uploader(
   opts, 
   filename, 
   mime): Uploader;
```

Defined in: [src/domain/classes/uploader.ts:41](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/classes/uploader.ts#L41)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | `DuplexOptions` |
| `filename` | `string` |
| `mime` | `string` |

###### Returns

[`Uploader`](#uploader)

###### Overrides

```ts
Duplex.constructor
```

#### Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="filename"></a> `filename` | `public` | `string` | [src/domain/classes/uploader.ts:35](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/classes/uploader.ts#L35) |
| <a id="mime"></a> `mime` | `public` | `string` | [src/domain/classes/uploader.ts:37](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/classes/uploader.ts#L37) |
| <a id="totalbytesread"></a> `totalBytesRead` | `public` | `number` | [src/domain/classes/uploader.ts:39](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/classes/uploader.ts#L39) |

#### Methods

##### \_read()

```ts
_read(size): void;
```

Defined in: [src/domain/classes/uploader.ts:52](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/classes/uploader.ts#L52)

**`Internal`**

Fires when data is available on the writable end, reads data

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `size` | `number` |

###### Returns

`void`

###### Overrides

```ts
Duplex._read
```

##### \_write()

```ts
_write(
   chunk, 
   encoding, 
   callback): void;
```

Defined in: [src/domain/classes/uploader.ts:62](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/classes/uploader.ts#L62)

**`Internal`**

Fires when a read happens, pushes read data to the readable end
- Additional processing: update the total upload size at each read

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `chunk` | `Buffer` |
| `encoding` | `BufferEncoding` |
| `callback` | (`error?`) => `void` |

###### Returns

`void`

###### Overrides

```ts
Duplex._write
```

##### \_final()

```ts
_final(callback): void;
```

Defined in: [src/domain/classes/uploader.ts:81](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/classes/uploader.ts#L81)

**`Internal`**

Fires once reads are exhausted on the writable end

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | (`error?`) => `void` |

###### Returns

`void`

###### Overrides

```ts
Duplex._final
```
