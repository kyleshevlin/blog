import React from 'react'
import { Button } from '../../../components/Button'

const NEXT_STATE_GRAPH = {
  lit: {
    TOGGLE: 'unlit',
    BREAK: 'broken',
  },
  unlit: {
    TOGGLE: 'lit',
    BREAK: 'broken',
  },
  broken: {},
}

const initialState = 'unlit'

const reducer = (state, event) => {
  if (event === 'RESET') {
    return initialState
  }

  const nextState = NEXT_STATE_GRAPH[state][event]
  return nextState !== undefined ? nextState : state
}

export default function LightBulb() {
  const [state, send] = React.useReducer(reducer, initialState)

  return (
    <div className="flex flex-col gap-2 font-sans">
      <div>State: {state}</div>

      <div className="flex gap-2">
        <Button onClick={() => send('TOGGLE')}>Toggle</Button>
        <Button onClick={() => send('BREAK')}>Break</Button>
        <Button onClick={() => send('RESET')}>Reset</Button>
      </div>
    </div>
  )
}
