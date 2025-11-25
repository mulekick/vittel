/**
 * Zod parsers for node.js based modules.
 * @module
 * @remarks
 * - Scope : DOMAIN.
 * - Parsers used in the domain layer to validate processing and external calls results.
 * - When creating a parser, map native types to zod types (primitives or classes).
 * - This module can only be imported in node.js based packages since it imports node primitives.
 */

// import modules
import {z} from "zod";

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
const SampleMessage: z.ZodObject<{
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
    SampleMessage: typeof SampleMessage;
    SampleData: typeof SampleData;
} = {
    SampleMessage,
    SampleData
};