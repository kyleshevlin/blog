function generateGrid<T>(rows: number, columns: number, mapper: () => T) {
  return Array(rows)
    .fill(undefined)
    .map(() => Array(columns).fill(undefined).map(mapper))
}

export const newTicTacToeGrid = () => generateGrid(3, 3, () => null)
