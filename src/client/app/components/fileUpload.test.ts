/**
 * @jest-environment jsdom
 */

// import modules
import React from "react";
import {jest, describe, expect, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import FileUpload from "./fileUpload.tsx";

// import jest-dom matchers
import "@testing-library/jest-dom";
// eslint-disable-next-line node/file-extension-in-import
import "@testing-library/jest-dom/jest-globals";

// create mocks for helpers ...
jest.mock(`../helpers/env.ts`, ():Record<string, unknown> => ({
    VITE_SRV_ENTRYPOINT: `/api`
}));

jest.mock(`../helpers/helpers.ts`, ():Record<string, unknown> => ({
    requestAsync: () => Promise.resolve()
}));

// do not use jsx syntax in tests ...
describe(`test file upload component`, ():void => {
    it(`should render and display correct values`, async():Promise<void> => {
        // arrange
        render(React.createElement(FileUpload, {}, null));

        // act
        await screen.findByTestId(`afile`);

        // assert
        expect(screen.getByText(/File uploads \(100 kb max, requires token\):/u)).toBeVisible();
        expect(screen.getByTestId(`afile`)).toBeVisible();
    });
});