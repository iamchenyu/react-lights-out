import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

// maybe not use testid because id should be unique ---> use role instead
function Cell({ flipCellsAroundMe, isLit }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return (
    <td
      className={classes}
      onClick={flipCellsAroundMe}
      data-testid="cell"
      role="button"
    />
  );
}

export default Cell;
