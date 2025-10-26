/**
 * @jest-environment jsdom
 */

// import modules
import React from "react";
import {describe, expect, it} from "@jest/globals";
import {render, screen as testScreen} from "@testing-library/react";
import ResourceFetching from "./resourceFetching.tsx";

// import jest-dom matchers
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";

// do not use jsx syntax in tests ...
describe(`test resource fetching component`, (): void => {
    it(`should render and display correct values`, (): void => {
        // arrange
        render(React.createElement(ResourceFetching, {content: {data: `some test value`, timestamp: new Date().getTime()}}, null));

        // act

        // assert
        expect(testScreen.getByText(/Server resources fetching:/u)).toBeVisible();
        expect(testScreen.getByText(`some test value`)).toBeVisible();
    });
});