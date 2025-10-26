/**
 * Common shared utility functions.
 * @module
 * @showCategories
 * @categoryDescription Miscellaneous
 * - Provides centralized, feature agnostic miscellaneous features.
 * @remarks
 * - Scope : GENERAL
 * - Utility functions that cover all app layers (controller, domain and data).
 * - Centralized in a dedicated package to avoid code redundancy across packages.
 * - Domain-specific functions will be declared at the package scope.
 * - This module can be imported in node.js based packages as well as browser packages.
 */

/**
 * Config only util to handle type conversion from dotenv values.
 * @category Miscellaneous
 */
export const configParseNumber = (value: string, defaultValue: number): number => (value && value.length && typeof Number(value) === `number` ? Number(value) : defaultValue);

/**
 * Returns a random number between 2 values.
 * @category Miscellaneous
 */
export const rnd = (lb: number, ub: number): number => lb + Math.round(Math.random() * (ub - lb));