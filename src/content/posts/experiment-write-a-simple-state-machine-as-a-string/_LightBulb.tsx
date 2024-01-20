import React from 'react'
import { createMachine } from 'xstate'
import { useMachine } from '@xstate/react'
import statechart from './_statechart'
import { Button } from '../../../components/Button'

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
    <div className="flex flex-col gap-2 font-sans">
      State: {String(state.value)}
      <div className="flex gap-2">
        <Button onClick={() => send('TOGGLE')}>Toggle</Button>
        <Button onClick={() => send('BREAK')}>Break</Button>
        <Button onClick={() => send('RESET')}>Reset</Button>
      </div>
    </div>
  )
}
