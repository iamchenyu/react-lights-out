import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

beforeEach(() => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.5);
});

afterEach(() => {
  jest.spyOn(global.Math, "random").mockRestore();
});

it("renders without crashing", () => {
  render(<Board />);
});

it("matches the snapshot", () => {
  const { asFragment } = render(<Board />);
  expect(asFragment()).toMatchSnapshot();
});

// New version
it("handles the click", () => {
  const { queryAllByRole } = render(<Board />);
  const cells = queryAllByRole("button");

  // check the status of each cell
  cells.forEach((cell) => expect(cell).toHaveClass("Cell Cell-lit"));

  // click on a random cell
  fireEvent.click(cells[6]);

  // check if only the cell and the surrouding cells are switched status
  let index = [1, 5, 6, 7, 11];
  cells.forEach((cell, idx) => {
    if (index.includes(idx)) {
      expect(cell).not.toHaveClass("Cell-lit");
    } else {
      expect(cell).toHaveClass("Cell-lit");
    }
  });
});

it("display the message properly", () => {
  const alertMock = jest.spyOn(window, "alert").mockImplementation();
  const { queryAllByRole } = render(<Board nrows={1} ncols={3} />);
  const cells = queryAllByRole("button");

  // no alert when start the game
  expect(alertMock).toHaveBeenCalledTimes(0);

  // click on the middle cell
  fireEvent.click(cells[1]);

  // display alert
  expect(alertMock).toHaveBeenCalledTimes(1);
});

// Old version
it("handles the click", () => {
  const alertMock = jest.spyOn(window, "alert").mockImplementation();
  const { getByTestId } = render(<Board nrows={1} ncols={1} />);
  const cell = getByTestId("cell");
  expect(cell.className).toBe("Cell Cell-lit");

  // check the cell flips
  fireEvent.click(cell);
  expect(cell.className).toBe("Cell ");

  // check the alert message comes up
  expect(alertMock).toHaveBeenCalledTimes(1);
});
