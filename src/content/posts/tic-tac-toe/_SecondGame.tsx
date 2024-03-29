import React from 'react'
import Grid from './_Grid'
import { ButtonCell } from './_Cell'
import { newTicTacToeGrid, NEXT_TURN } from './_utils'
import { Button } from '../../../components/Button'
import { clone } from '../../../utils'
import type { Action, BaseState } from './_types'

const getInitialState = (): BaseState => ({
  grid: newTicTacToeGrid(),
  turn: 'X',
})

const reducer = (state: BaseState, action: Action) => {
  switch (action.type) {
    case 'RESET':
      return getInitialState()

    case 'CLICK': {
      const { x, y } = action.payload
      // Since we need immutable updates, I often find the simplest thing to do
      // is to clone the current state, and then use mutations on the clone to
      // make updates for the next state
      const nextState = clone(state)
      const { grid, turn } = nextState

      // If the cell already has a value, clicking on it should do nothing
      // Also, pay attention, because our rows are first, the `y` value is the
      // first index, the `x` value second. This takes some getting used to.
      if (grid[y][x]) {
        return state
      }

      // If we're here in our program, we can assign this cell to the current
      // `turn` value
      grid[y][x] = turn

      // Now that we've used this turn, we need to set the next turn. It might
      // be overkill, but I've used an object enum to do this.
      nextState.turn = NEXT_TURN[turn]

      // We'll add checks for winning or drawing soon

      return nextState
    }

    default:
      return state
  }
}

export default function Game() {
  const [state, dispatch] = React.useReducer(reducer, getInitialState())
  const { grid, turn } = state

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
          <div className="flex items-center justify-between gap-2">
            <div className="font-sans">Next up: {turn}</div>
            <Button onClick={reset}>Reset</Button>
          </div>

          <Grid Cell={ButtonCell} grid={grid} handleClick={handleClick} />
        </div>
      </div>
    </div>
  )
}
