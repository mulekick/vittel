/**
 * @jest-environment jsdom
 */

// import modules
import React from "react";
import {describe, expect, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import ResourceFetching from "./resourceFetching.tsx";

// import jest-dom matchers
import "@testing-library/jest-dom";
// eslint-disable-next-line node/file-extension-in-import
import "@testing-library/jest-dom/jest-globals";

// do not use jsx syntax in tests ...
describe(`test resource fetching component`, ():void => {
    it(`should render and display correct values`, ():void => {
        // arrange
        render(React.createElement(ResourceFetching, {content: `some test value`}, null));

        // act

        // assert
        expect(screen.getByText(/Server resources fetching:/u)).toBeVisible();
        expect(screen.getByText(`server: some test value`)).toBeVisible();
    });
});