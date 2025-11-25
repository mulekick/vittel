[**@vittel/types**](../README.md)

***

[@vittel/types](../README.md) / src/parsers

# src/parsers

Zod parsers for node.js based modules.

## Table of contents

* [Remarks](#remarks)
* [Variables](#variables)

## Remarks

* Scope : DOMAIN.
* Parsers used in the domain layer to validate processing and external calls results.
* When creating a parser, map native types to zod types (primitives or classes).
* This module can only be imported in node.js based packages since it imports node primitives.

## Variables

### SampleData

```ts
const SampleData: z.ZodObject<{
  data: z.ZodString;
  timestamp: z.ZodNumber;
}>;
```

Defined in: [src/parsers.ts:21](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/parsers.ts#L21)

Parser for sample data objects.

***

### SampleMessage

```ts
const SampleMessage: z.ZodObject<{
  event: z.ZodString;
  data: z.ZodUnknown;
}>;
```

Defined in: [src/parsers.ts:32](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/parsers.ts#L32)

Parser for mock message objects.

***

### parsers

```ts
const parsers: {
  SampleMessage: typeof SampleMessage;
  SampleData: typeof SampleData;
};
```

Defined in: [src/parsers.ts:43](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/parsers.ts#L43)

Export wrapper for parser objects.

#### Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| <a id="samplemessage-1"></a> `SampleMessage` | *typeof* [`SampleMessage`](#samplemessage) | [src/parsers.ts:44](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/parsers.ts#L44) |
| <a id="sampledata-1"></a> `SampleData` | *typeof* [`SampleData`](#sampledata) | [src/parsers.ts:45](https://github.com/mulekick/vittel/blob/f90901bbc10e6a0573fc6bdede5e6e7c3e83c9b1/packages/types/src/parsers.ts#L45) |
