[**@vittel/types**](../README.md)

***

[@vittel/types](../README.md) / src/parsers

# src/parsers

Zod parsers for node.js based modules.

## Remarks

- Scope : DOMAIN.
- Parsers are used in the domain layer for validation of processing results and external calls.
- This module should import domain-specific classes if needed.
- When creating a parser, map native types to zod types (primitives or classes).
- This module can only be imported in node.js based packages since it imports node primitives.

## Variables

### SampleData

```ts
const SampleData: z.ZodObject<{
  data: z.ZodString;
  timestamp: z.ZodNumber;
}>;
```

Defined in: [src/parsers.ts:56](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L56)

Parser for sample data objects.

***

### FakeMessage

```ts
const FakeMessage: z.ZodObject<{
  event: z.ZodString;
  data: z.ZodUnknown;
}>;
```

Defined in: [src/parsers.ts:67](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L67)

Parser for mock message objects.

***

### parsers

```ts
const parsers: {
  Nullable: typeof Nullable;
  ArrayOf: typeof ArrayOf;
  PromiseOf: typeof PromiseOf;
  FakeMessage: typeof FakeMessage;
  SampleData: typeof SampleData;
};
```

Defined in: [src/parsers.ts:78](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L78)

Export wrapper for parser objects.

#### Type declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="nullable-3"></a> `Nullable` | *typeof* [`Nullable`](#nullable) | [src/parsers.ts:79](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L79) |
| <a id="arrayof-3"></a> `ArrayOf` | *typeof* [`ArrayOf`](#arrayof) | [src/parsers.ts:80](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L80) |
| <a id="promiseof-3"></a> `PromiseOf` | *typeof* [`PromiseOf`](#promiseof) | [src/parsers.ts:81](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L81) |
| <a id="fakemessage-1"></a> `FakeMessage` | *typeof* [`FakeMessage`](#fakemessage) | [src/parsers.ts:82](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L82) |
| <a id="sampledata-1"></a> `SampleData` | *typeof* [`SampleData`](#sampledata) | [src/parsers.ts:83](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L83) |

## Functions

### Nullable()

```ts
function Nullable<T>(current): ZodUnion<[T, ZodNull]>;
```

Defined in: [src/parsers.ts:27](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L27)

Returns a nullable parser for generic types.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `ZodTypeAny` | Initial type to be rendered nullable. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `current` | `T` | The parser for the initial type. |

#### Returns

`ZodUnion`\<\[`T`, `ZodNull`\]\>

A parser for the union of T and null.

#### Remarks

- Will be used to parse payloads returned by the data layer

***

### ArrayOf()

```ts
function ArrayOf<T>(current): ZodArray<T>;
```

Defined in: [src/parsers.ts:37](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L37)

Returns an array parser for generic types.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `ZodTypeAny` | Initial type to parse the array with. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `current` | `T` | The parser for the initial type. |

#### Returns

`ZodArray`\<`T`\>

A parser for an array of values of type T.

#### Remarks

- Will be used to parse payloads returned by the data layer

***

### PromiseOf()

```ts
function PromiseOf<T>(current): ZodPromise<T>;
```

Defined in: [src/parsers.ts:47](https://github.com/mulekick/vittel/blob/fd6f7ece7df6639cbc3c099ded62d635ce6ae274/packages/types/src/parsers.ts#L47)

Returns a promise parser for generic types.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `ZodTypeAny` | Initial type to be promisified. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `current` | `T` | The parser for the initial type. |

#### Returns

`ZodPromise`\<`T`\>

A parser for a promise that resolves to the initial type.

#### Remarks

- Will be used to parse payloads returned by the data layer
