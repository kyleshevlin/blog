function generateGrid(rows, columns, mapper) {
  return Array(rows)
    .fill()
    .map(() => Array(columns).fill().map(mapper))
}

export const newTicTacToeGrid = () => generateGrid(3, 3, () => null)
