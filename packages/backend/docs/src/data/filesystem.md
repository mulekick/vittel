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

### getWritableStreamToFile()

```ts
function getWritableStreamToFile(): WriteStream;
```

Defined in: [src/data/filesystem.ts:19](https://github.com/mulekick/vittel/blob/8307f932f4f19ea2d97df542348a9b002b5fc519/packages/backend/src/data/filesystem.ts#L19)

Sync: creates a writable stream to a file system path (demonstration: discard file to /dev/null)

#### Returns

`WriteStream`
