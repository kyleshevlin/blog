import type { CellValue, Turn } from './_types'

function generateGrid<T>(rows: number, columns: number, mapper: () => T) {
  return Array(rows)
    .fill(undefined)
    .map(() => Array(columns).fill(undefined).map(mapper))
}

export const newTicTacToeGrid = () => generateGrid(3, 3, () => null)

export const NEXT_TURN: Record<Turn, Turn> = {
  X: 'O',
  O: 'X',
}

export const checkThree = (a: CellValue, b: CellValue, c: CellValue) => {
  if (!a || !b || !c) return false
  return a === b && b === c
}
