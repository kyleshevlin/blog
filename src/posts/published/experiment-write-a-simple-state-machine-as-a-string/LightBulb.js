import React from 'react'
import { Machine } from 'xstate'
import { useMachine } from '@xstate/react'
import statechart from './statechart'
import Button from '../../../components/Button'
import OffsetWrap from '../../../components/OffsetWrap'

const chart = statechart(`
lightBulb
unlit
lit unlit TOGGLE
unlit lit TOGGLE
lit broken BREAK
unlit broken BREAK
broken unlit RESET
`)

const lightBulbMachine = Machine(chart)

export default function LightBulb() {
  const [state, send] = useMachine(lightBulbMachine)

  return (
    <OffsetWrap>
      State: {state}
      <div>
        <Button onClick={() => send('TOGGLE')}>Toggle</Button>
        <Button onClick={() => send('BREAK')}>Break</Button>
        <Button onClick={() => send('RESET')}>Reset</Button>
      </div>
    </OffsetWrap>
  )
}
