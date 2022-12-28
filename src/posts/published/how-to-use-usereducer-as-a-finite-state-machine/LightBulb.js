import React from 'react'
import { bs } from '../../../shevy'
import Button from '../../../components/Button'

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
    <div>
      State: {state}
      <div css={{ marginTop: bs(0.5) }}>
        <ButtonWrap>
          <Button onClick={() => send('TOGGLE')}>Toggle</Button>
        </ButtonWrap>
        <ButtonWrap>
          <Button onClick={() => send('BREAK')}>Break</Button>
        </ButtonWrap>
        <ButtonWrap>
          <Button onClick={() => send('RESET')}>Reset</Button>
        </ButtonWrap>
      </div>
    </div>
  )
}

function ButtonWrap({ children }) {
  return <span css={{ marginRight: bs(0.5) }}>{children}</span>
}
