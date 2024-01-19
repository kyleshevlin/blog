import React from 'react'

export default function Grid({ Cell, grid, handleClick = () => {} }) {
  return (
    // Wrapping the grid with a div of inline-block means that the grid
    // takes up only the space defined by the size of the cells, while
    // still allowing us to use fractional values
    <div className="inline-block">
      <div
        // We set a background color to be revealed as the lines
        // of the board with the `grid-gap` property
        className="m-8 grid gap-[2px] bg-current"
        style={{
          // Our rows are equal to the length of our grid
          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
          // Our columns are equal to the length of a row
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            // We put the colIdx first because that is our X-axis value
            // and the rowIdx second because that is our Y-axis value
            // Getting in the habit makes using 2d grids much easier
            <Cell
              key={`${colIdx}-${rowIdx}`}
              cell={cell}
              handleClick={() => {
                handleClick(colIdx, rowIdx)
              }}
              x={colIdx}
              y={colIdx}
            />
          )),
        )}
      </div>
    </div>
  )
}
