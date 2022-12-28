import React from 'react'
import { createMachine } from 'xstate'
import { useMachine } from '@xstate/react'
import statechart from './statechart'
import Button from '../../../components/Button'
import { bs } from '../../../shevy'

const chart = statechart(`
lightBulb
unlit
lit unlit TOGGLE
unlit lit TOGGLE
lit broken BREAK
unlit broken BREAK
broken unlit RESET
`)

const lightBulbMachine = createMachine(chart)

export default function LightBulb() {
  const [state, send] = useMachine(lightBulbMachine)

  return (
    <div>
      State: {state.value}
      <div
        css={{
          marginTop: bs(0.5),
          'button + button': {
            marginLeft: bs(0.5),
          },
        }}
      >
        <Button onClick={() => send('TOGGLE')}>Toggle</Button>
        <Button onClick={() => send('BREAK')}>Break</Button>
        <Button onClick={() => send('RESET')}>Reset</Button>
      </div>
    </div>
  )
}
