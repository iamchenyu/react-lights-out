import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.6 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let x = 0; x < nrows; x++) {
      let row = [];
      for (let y = 0; y < ncols; y++) {
        // Old version
        // row.push(Math.random() < chanceLightStartsOn ? true : false);
        // Refactor version
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.

    // Old version
    // let allCells = [];
    // board.map((row) => row.map((cell) => allCells.push(cell)));
    // return allCells.find((el) => el);

    // New version
    return board.every((row) => row.every((cell) => !cell));
  }

  function flipCellsAround(coord) {
    setBoard((board) => {
      const [x, y] = coord.split("-").map(Number);

      const flipCell = (x, y, arr) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
          arr[x][y] = !arr[x][y];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = [...board];

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(x, y, boardCopy);
      flipCell(x - 1, y, boardCopy);
      flipCell(x + 1, y, boardCopy);
      flipCell(x, y - 1, boardCopy);
      flipCell(x, y + 1, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    alert("You have won!");
  }
  // make table board

  // TODO
  return (
    <table className="Board">
      <tbody>
        {board.map((row, idxRow) => {
          return (
            <tr key={idxRow}>
              {row.map((cell, idxCol) => {
                return (
                  <Cell
                    key={idxCol}
                    isLit={cell}
                    flipCellsAroundMe={() =>
                      flipCellsAround(`${idxRow}-${idxCol}`)
                    }
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Board;
