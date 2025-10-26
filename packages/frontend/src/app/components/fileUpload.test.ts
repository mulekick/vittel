/**
 * @jest-environment jsdom
 */

// import modules
import React from "react";
import {jest, describe, expect, it} from "@jest/globals";
import {render, screen as testScreen} from "@testing-library/react";
import FileUpload from "./fileUpload.tsx";

// import jest-dom matchers
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";

// create mocks for helpers ...
jest.mock(`../helpers/env.ts`, (): Record<string, unknown> => ({
    VITE_SRV_ENTRYPOINT: `/api`
}));

jest.mock(`../helpers/helpers.ts`, (): Record<string, unknown> => ({
    postFileAsync: () => Promise.resolve()
}));

// do not use jsx syntax in tests ...
describe(`test file upload component`, (): void => {
    it(`should render and display correct values`, async(): Promise<void> => {
        // arrange
        render(React.createElement(FileUpload, {}, null));

        // act
        await testScreen.findByTestId(`afile`);

        // assert
        expect(testScreen.getByText(/File uploads \(100 kb max, requires token\):/u)).toBeVisible();
        expect(testScreen.getByTestId(`afile`)).toBeVisible();
    });
});