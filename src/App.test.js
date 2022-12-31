import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.5);
});

afterEach(() => {
  jest.spyOn(global.Math, "random").mockRestore();
});

it("renders without crashing", () => {
  render(<App />);
});

it("matches the snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
