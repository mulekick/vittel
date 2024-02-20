/**
 * @jest-environment jsdom
 */

// import modules
import React from "react";
import {describe, expect, it} from "@jest/globals";
import {render, screen as testScreen} from "@testing-library/react";
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
        await testScreen.findByTestId(`pepe`);

        // assert
        expect(testScreen.getByText(/Include npm modules in client bundle:/u)).toBeVisible();
        expect(testScreen.getByRole(`link`)).toBeVisible();
        expect(testScreen.getByDisplayValue(`some test value`)).toBeVisible();
    });
});