/**
 * @jest-environment jsdom
 */

// import modules
import {describe, expect, it} from "@jest/globals";

// write tests
describe(`basic unit tests`, (): void => {
    it(`should work`, (): void => {
        // assert
        expect(1 + 1).toBe(2);
    });
});