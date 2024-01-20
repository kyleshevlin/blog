import React from 'react'
import { Button } from '../../../components/Button'
import { Ball, Canvas, Wrap } from './_shared'

const GRAVITY = 0.5
const JUMP_IMPULSE = 12

type State = {
  ballState: 'idle' | 'jumping'
  delta: number
  jumpsRemaining: number
  position: number
}

const initialState: State = {
  ballState: 'idle',
  delta: 0,
  jumpsRemaining: 2,
  position: 0,
}

type EventT = 'CLICK' | 'TICK'

const reducer = (state: State, event: EventT): State => {
  switch (event) {
    case 'CLICK': {
      if (state.jumpsRemaining === 0) {
        return state
      }

      return {
        ...state,
        ballState: 'jumping',
        delta: state.delta + JUMP_IMPULSE,
        jumpsRemaining: state.jumpsRemaining - 1,
      }
    }

    case 'TICK': {
      if (state.ballState === 'idle') return state

      const nextDelta = state.delta - GRAVITY
      const nextPosition = state.position + nextDelta

      if (nextPosition <= 0) {
        return initialState
      }

      return {
        ...state,
        ballState: 'jumping',
        delta: nextDelta,
        position: nextPosition,
      }
    }

    default:
      return state
  }
}

export default function ReducerJumpingBall() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const tick = React.useCallback(() => {
    dispatch('TICK')
  }, [])

  const handleClick = React.useCallback(() => {
    dispatch('CLICK')
  }, [])

  React.useEffect(() => {
    const id = setInterval(tick, 1000 / 60)

    return () => clearInterval(id)
  }, [tick])

  return (
    <Wrap>
      <Canvas>
        <Ball position={state.position} />
      </Canvas>

      <Button onClick={handleClick}>Jump</Button>
    </Wrap>
  )
}
