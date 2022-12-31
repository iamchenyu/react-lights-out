import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

// New version
// https://testing-library.com/docs/react-testing-library/api/#render
// append vs appendChild
// https://dev.to/ibn_abubakre/append-vs-appendchild-a4m

let container;

beforeEach(() => {
  const tr = document.createElement("tr");
  container = document.body.appendChild(tr);
});

it("renders without crashing", () => {
  render(<Cell />, { container });
});

it("matches the snapshot when lit", () => {
  const { asFragment } = render(<Cell isLit />, { container });
  expect(asFragment()).toMatchSnapshot();
});

it("matches the snapshot when unlit", () => {
  const { asFragment } = render(<Cell />, { container });
  expect(asFragment()).toMatchSnapshot();
});

// Old version
// it("renders without crashing", () => {
//   render(
//     <tr>
//       <Cell />
//     </tr>
//   );
// });

// it("matches the snapshot", () => {
//   const { asFragment } = render(
//     <tr>
//       <Cell />
//     </tr>
//   );
//   expect(asFragment()).toMatchSnapshot();
// });
