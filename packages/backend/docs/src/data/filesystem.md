[**@vittel/backend**](../../README.md)

***

[@vittel/backend](../../README.md) / src/data/filesystem

# src/data/filesystem

File system access features.

## Remarks

- Scope : DATA.
- Implements vendor specific file system access features.
- Returns results to the domain layer for validation and parsing.

## Functions

### getWritableStreamToFileSync()

```ts
function getWritableStreamToFileSync(path): WriteStream;
```

Defined in: [src/data/filesystem.ts:21](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/backend/src/data/filesystem.ts#L21)

Sync: creates a writable stream to a file system path

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

#### Returns

`WriteStream`
