import React from 'react'
import Grid from './_Grid'
import { ButtonCell } from './_Cell'
import { newTicTacToeGrid } from './_utils'

// Simple way to deeply clone an array or object
const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x))

// An enum for the next turn in our game
const NEXT_TURN = {
  O: 'X',
  X: 'O',
}

const initialState = {
  grid: newTicTacToeGrid(),
  turn: 'X',
}

const reducer = (state, action) => {
  switch (action.type) {
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
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { grid } = state

  const handleClick = (x, y) => {
    dispatch({ type: 'CLICK', payload: { x, y } })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="font-sans font-bold uppercase">Interactive</div>

      <div className="text-center">
        <Grid Cell={ButtonCell} grid={grid} handleClick={handleClick} />
      </div>
    </div>
  )
}
