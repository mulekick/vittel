/**
 * @jest-environment jsdom
 */

// import modules
import React from "react";
import {jest, describe, expect, it} from "@jest/globals";
import {render, screen as testScreen} from "@testing-library/react";
import WebTokens from "./webTokens.tsx";

// import jest-dom matchers
import "@testing-library/jest-dom";
// eslint-disable-next-line node/file-extension-in-import
import "@testing-library/jest-dom/jest-globals";

// create mocks for helpers ...
jest.mock(`../helpers/env.ts`, (): Record<string, unknown> => ({
    VITE_SRV_ENTRYPOINT: `/api`
}));

jest.mock(`../helpers/helpers.ts`, (): Record<string, unknown> => ({
    getAsync: () => Promise.resolve()
}));

// do not use jsx syntax in tests ...
describe(`test web tokens component`, (): void => {
    it(`should render and display correct values`, async(): Promise<void> => {
        // arrange
        render(React.createElement(WebTokens, {protectedContent: `some test value`}, null));

        // act
        await testScreen.findByRole(`button`);

        // assert
        expect(testScreen.getByText(/Stateless client-side sessions with JSON Web Tokens:/u)).toBeVisible();
        expect(testScreen.getByRole(`button`)).toBeVisible();
        expect(testScreen.getByRole(`button`)).toHaveTextContent(`request a token`);
        expect(testScreen.getByText(`some test value`)).toBeVisible();
    });
});