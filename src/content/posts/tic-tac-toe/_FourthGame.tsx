import React from 'react'
import Grid from './_Grid'
import { ButtonCell } from './_Cell'
import { NEXT_TURN, checkThree, newTicTacToeGrid } from './_utils'
import { Button } from '../../../components/Button'
import { clone } from '../../../utils'
import type { Action, FlatGrid, Turn, AdvancedState } from './_types'

function checkForWin(flatGrid: FlatGrid) {
  const [nw, n, ne, w, c, e, sw, s, se] = flatGrid

  return (
    checkThree(nw, n, ne) ||
    checkThree(w, c, e) ||
    checkThree(sw, s, se) ||
    checkThree(nw, w, sw) ||
    checkThree(n, c, s) ||
    checkThree(ne, e, se) ||
    checkThree(nw, c, se) ||
    checkThree(ne, c, sw)
  )
}

function checkForDraw(flatGrid: FlatGrid) {
  return (
    !checkForWin(flatGrid) &&
    flatGrid.filter(Boolean).length === flatGrid.length
  )
}

const getInitialState = (): AdvancedState => ({
  grid: newTicTacToeGrid(),
  status: 'inProgress',
  turn: 'X',
})

const reducer = (state: AdvancedState, action: Action) => {
  if (state.status === 'success' && action.type !== 'RESET') {
    return state
  }

  switch (action.type) {
    case 'RESET':
      return getInitialState()

    case 'CLICK': {
      const { x, y } = action.payload
      const nextState = clone(state)
      const { grid, turn } = nextState

      if (grid[y][x]) {
        return state
      }

      grid[y][x] = turn

      const flatGrid = grid.flat()

      if (checkForWin(flatGrid)) {
        nextState.status = 'success'
        return nextState
      }

      if (checkForDraw(flatGrid)) {
        return getInitialState()
      }

      nextState.turn = NEXT_TURN[turn]

      return nextState
    }

    default:
      return state
  }
}

const GAME_STATUS_TEXT = {
  inProgress: () => null,
  success: (turn: Turn) => `${turn} won!`,
}

export default function Game() {
  const [state, dispatch] = React.useReducer(reducer, getInitialState())
  const { grid, status, turn } = state

  const handleClick = (x: number, y: number) => {
    dispatch({ type: 'CLICK', payload: { x, y } })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="font-sans font-bold uppercase">Interactive</div>

      <div className="flex justify-center">
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between gap-2 font-sans">
            <div>Next up: {turn}</div>
            <div>{GAME_STATUS_TEXT[status](turn)}</div>
            <Button onClick={reset}>Reset</Button>
          </div>

          <Grid Cell={ButtonCell} grid={grid} handleClick={handleClick} />
        </div>
      </div>
    </div>
  )
}
