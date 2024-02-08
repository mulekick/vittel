/**
 * @jest-environment jsdom
 */

// import modules
import React from "react";
import {describe, expect, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import ModuleBundling from "./moduleBundling.tsx";

// import jest-dom matchers
import "@testing-library/jest-dom";
// eslint-disable-next-line node/file-extension-in-import
import "@testing-library/jest-dom/jest-globals";

// do not use jsx syntax in tests ...
describe(`test module bundling component`, ():void => {
    it(`should render and display correct values`, async():Promise<void> => {
        // arrange
        render(React.createElement(ModuleBundling, {pepe: `some test value`}, null));

        // act
        await screen.findByTestId(`pepe`);

        // assert
        expect(screen.getByText(/Include npm modules in client bundle:/u)).toBeVisible();
        expect(screen.getByRole(`link`)).toBeVisible();
        expect(screen.getByDisplayValue(`some test value`)).toBeVisible();
    });
});