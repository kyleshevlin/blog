import { createMachine } from 'xstate'
import { useMachine } from '@xstate/react'
import { Button } from '../../../../components/Button'
import React from 'react'

const elevatorMachine = createMachine({
  strict: true,
  predictableActionArguments: true,
  id: 'elevator-1',
  initial: 'stop',
  context: {
    position: 0,
  },
  states: {
    stop: {
      on: {
        UP: 'up',
        DOWN: 'down',
      },
    },
    up: {
      on: {
        STOP: 'stop',
        DOWN: 'down',
      },
    },
    down: {
      on: {
        STOP: 'stop',
        UP: 'up',
      },
    },
  },
})

export function Elevator() {
  const [state, send] = useMachine(elevatorMachine)
  const [position, setPosition] = React.useState(0)

  React.useEffect(() => {
    if (state.value === 'STOP') return

    function update() {
      const { value } = state

      switch (value) {
        case 'up':
          setPosition(s => s - 1)
          break

        case 'down':
          setPosition(s => s + 1)
          break

        default:
          break
      }
    }

    const id = setInterval(update, 1000 / 30)

    return () => clearInterval(id)
  }, [state])

  return (
    <div className="flex gap-4 overflow-hidden">
      <div className="flex flex-col gap-2 text-sm">
        <Button onClick={() => send('STOP')}>Stop</Button>
        <Button onClick={() => send('UP')}>Up</Button>
        <Button onClick={() => send('DOWN')}>Down</Button>
      </div>
      <div className="relative h-48">
        <div
          className="absolute flex h-12 bg-gray-300"
          style={{ top: position }}
        >
          <div className="w-4"></div>
          <div className="h-full w-[1px] bg-black" />
          <div className="w-4"></div>
        </div>
      </div>
    </div>
  )
}
