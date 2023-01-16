import React from 'react'
import Grid from './Grid'
import { ButtonCell } from './Cell'
import { newTicTacToeGrid } from './utils'
import { bs } from '../../../shevy'
import Button from '../../../components/Button'

// Simple way to deeply clone an array or object
const clone = x => JSON.parse(JSON.stringify(x))

// An enum for the next turn in our game
const NEXT_TURN = {
  O: 'X',
  X: 'O',
}

const getInitialState = () => ({
  grid: newTicTacToeGrid(),
  turn: 'X',
})

const reducer = (state, action) => {
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

  const handleClick = (x, y) => {
    dispatch({ type: 'CLICK', payload: { x, y } })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  return (
    <>
      <div
        style={{
          fontFamily: 'var(--fonts-secondary)',
          fontWeight: 'bold',
          marginBottom: bs(),
          textTransform: 'uppercase',
        }}
      >
        Interactive
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: bs(),
            }}
          >
            <div>Next up: {turn}</div>
            <Button onClick={reset}>Reset</Button>
          </div>
          <Grid Cell={ButtonCell} grid={grid} handleClick={handleClick} />
        </div>
      </div>
    </>
  )
}
