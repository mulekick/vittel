/**
 * @jest-environment jsdom
 */

// import modules
import React from "react";
import {jest, describe, expect, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import AssetImport from "./assetImport.tsx";

// import jest-dom matchers
import "@testing-library/jest-dom";
// eslint-disable-next-line node/file-extension-in-import
import "@testing-library/jest-dom/jest-globals";

// create mocks for assets ...
jest.mock(`../../img/vite.svg`, ():string => ``);

// do not use jsx syntax in tests ...
describe(`test assets import component`, ():void => {
    it(`should render and display correct values`, async():Promise<void> => {
        // arrange
        render(React.createElement(AssetImport, {}, null));

        // act
        await screen.findByAltText(`Vite logo`);

        // assert
        expect(screen.getByText(/Static assets imports as urls:/u)).toBeVisible();
        expect(screen.getByAltText(`Vite logo`)).toBeVisible();
    });
});