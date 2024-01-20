export type Turn = 'X' | 'O'
export type CellValue = Turn | null
export type Grid = CellValue[][]
export type FlatGrid = CellValue[]

export type BaseState = {
  grid: Grid
  turn: Turn
}

export type AdvancedState = BaseState & {
  status: 'inProgress' | 'success'
}

export type Action =
  | { type: 'RESET' }
  | { type: 'CLICK'; payload: { x: number; y: number } }
