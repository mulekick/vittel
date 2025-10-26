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

## Type Aliases

### UploaderCreator()

```ts
type UploaderCreator = (file, mime) => Uploader;
```

Defined in: [src/domain/transactions/upload.ts:22](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/transactions/upload.ts#L22)

Higher order function type

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `file` | `string` |
| `mime` | `string` |

#### Returns

[`Uploader`](../classes/uploader.md#uploader)

#### See

[File uploader class](../classes/uploader.md#uploader)

## Functions

### createFileUploader()

```ts
function createFileUploader(): UploaderCreator;
```

Defined in: [src/domain/transactions/upload.ts:36](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/transactions/upload.ts#L36)

Sync: call to data layer
- Returns the uploader object creation function

#### Returns

[`UploaderCreator`](#uploadercreator)

#### See

 - [Get writable stream to file](../../data/filesystem.md#getwritablestreamtofilesync)
 - TransactionUploadParser \| Constraints for parsing class instances

***

### getUploadResult()

```ts
function getUploadResult(upload): string;
```

Defined in: [src/domain/transactions/upload.ts:58](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/domain/transactions/upload.ts#L58)

Sync: read uploader object properties

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `upload` | [`Uploader`](../classes/uploader.md#uploader) |

#### Returns

`string`
