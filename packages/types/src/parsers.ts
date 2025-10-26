/**
 * Zod parsers for node.js based modules.
 * @module
 * @remarks
 * - Scope : DOMAIN.
 * - Parsers are used in the domain layer for validation of processing results and external calls.
 * - This module should import domain-specific classes if needed.
 * - When creating a parser, map native types to zod types (primitives or classes).
 * - This module can only be imported in node.js based packages since it imports node primitives.
 */

// import modules
import {z} from "zod";

// ##############################################################
// #                       UTILITY TYPES                        #
// ##############################################################

/**
 * Returns a nullable parser for generic types.
 * @typeParam T Initial type to be rendered nullable.
 * @param current - The parser for the initial type.
 * @returns A parser for the union of T and null.
 * @remarks
 * - Will be used to parse payloads returned by the data layer
 */
const Nullable = <T extends z.ZodTypeAny>(current: T): z.ZodUnion<[T, z.ZodNull]> => z.union([ current, z.null() ]);

/**
 * Returns an array parser for generic types.
 * @typeParam T Initial type to parse the array with.
 * @param current - The parser for the initial type.
 * @returns A parser for an array of values of type T.
 * @remarks
 * - Will be used to parse payloads returned by the data layer
 */
const ArrayOf = <T extends z.ZodTypeAny>(current: T): z.ZodArray<T> => z.array(current);

/**
 * Returns a promise parser for generic types.
 * @typeParam T Initial type to be promisified.
 * @param current - The parser for the initial type.
 * @returns A parser for a promise that resolves to the initial type.
 * @remarks
 * - Will be used to parse payloads returned by the data layer
 */
const PromiseOf = <T extends z.ZodTypeAny>(current: T): z.ZodPromise<T> => z.promise(current);

// ##############################################################
// #                      SERVER API TYPES                      #
// ##############################################################

/**
 * Parser for sample data objects.
 */
const SampleData: z.ZodObject<{
    data: z.ZodString;
    timestamp: z.ZodNumber;
}> = z.object({
    data: z.string(),
    timestamp: z.number()
});

/**
 * Parser for mock message objects.
 */
const FakeMessage: z.ZodObject<{
    event: z.ZodString;
    data: z.ZodUnknown;
}> = z.object({
    event: z.string(),
    data: z.unknown()
});

/**
 * Export wrapper for parser objects.
 */
export const parsers: {
    Nullable: typeof Nullable;
    ArrayOf: typeof ArrayOf;
    PromiseOf: typeof PromiseOf;
    FakeMessage: typeof FakeMessage;
    SampleData: typeof SampleData;
} = {
    Nullable,
    ArrayOf,
    PromiseOf,
    FakeMessage,
    SampleData
};