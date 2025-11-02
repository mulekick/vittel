[**@vittel/backend**](../../../README.md)

***

[@vittel/backend](../../../README.md) / src/domain/transactions/upload

# src/domain/transactions/upload

Features that involve file upload / streaming of data.

## Remarks

- Scope : DOMAIN / TRANSACTIONS.
- Domain processing can involve calls to the data layer or not.
- Results will be parsed and returned if valid, or and error will be thrown.
- Do not import controller layer modules here to remain framework agnostic.

## Classes

### Uploader

Defined in: [src/domain/transactions/upload.ts:39](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/transactions/upload.ts#L39)

Duplex stream based file uploading class.

#### Remarks

- This class is a template for how to process data streams in addition to objects :
  1. It exposes a writable stream to the controller layer to receive the uploaded file.
  2. It exposes a readable stream to the data layer to persist the uploaded file.
- Additional processing can be implemented in the stream methods (see below).
- Working with streams allows the domain layer to remain framework and database agnostic.

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

Defined in: [src/domain/transactions/upload.ts:47](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/transactions/upload.ts#L47)

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
| <a id="filename"></a> `filename` | `public` | `string` | [src/domain/transactions/upload.ts:41](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/transactions/upload.ts#L41) |
| <a id="mime"></a> `mime` | `public` | `string` | [src/domain/transactions/upload.ts:43](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/transactions/upload.ts#L43) |
| <a id="totalbytesread"></a> `totalBytesRead` | `public` | `number` | [src/domain/transactions/upload.ts:45](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/transactions/upload.ts#L45) |

#### Methods

##### \_read()

```ts
_read(size): void;
```

Defined in: [src/domain/transactions/upload.ts:58](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/transactions/upload.ts#L58)

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

Defined in: [src/domain/transactions/upload.ts:68](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/transactions/upload.ts#L68)

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

Defined in: [src/domain/transactions/upload.ts:87](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/transactions/upload.ts#L87)

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

## Functions

### createUploader()

```ts
function createUploader(file, mime): Uploader;
```

Defined in: [src/domain/transactions/upload.ts:99](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/transactions/upload.ts#L99)

Sync: call to data layer
- Returns the file uploader object

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `file` | `string` |
| `mime` | `string` |

#### Returns

[`Uploader`](#uploader)

#### See

[Get writable stream to file](../../data/filesystem.md#getwritablestreamtofile)

***

### getUploadResult()

```ts
function getUploadResult(upload): string;
```

Defined in: [src/domain/transactions/upload.ts:121](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/domain/transactions/upload.ts#L121)

Sync: read uploader object properties

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `upload` | [`Uploader`](#uploader) |

#### Returns

`string`
