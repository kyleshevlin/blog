import React from 'react'

import { Button } from '../../../components/Button'

const FPS = 1000 / 15
const METER_HEIGHT = 300

type Status = 'idle' | 'running'

type State = {
  decay: number
  impulse: number
  status: Status
  value: number
}

function getInitialState({
  decay,
  impulse,
}: Pick<State, 'decay' | 'impulse'>): State {
  return { decay, impulse, status: 'idle', value: 0 }
}

type Action = { type: 'TICK' } | { type: 'CLICK' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TICK': {
      const nextValue = Math.max(0, state.value - state.decay)

      return {
        ...state,
        status: nextValue > 0 ? 'running' : 'idle',
        value: nextValue,
      }
    }

    case 'CLICK': {
      const nextValue = Math.min(100, state.value + state.impulse)

      return {
        ...state,
        status: 'running',
        value: nextValue,
      }
    }

    default:
      return state
  }
}

type Props = {
  decay: number
  impulse: number
}

export function TestYourFocus({ decay, impulse }: Props) {
  const [state, dispatch] = React.useReducer(
    reducer,
    getInitialState({ decay, impulse }),
  )

  const { status } = state

  const handleClick = React.useCallback(() => {
    dispatch({ type: 'CLICK' })
  }, [])

  React.useEffect(() => {
    if (status === 'idle') return

    const id = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, FPS)

    return () => clearInterval(id)
  }, [status])

  return (
    <Wrap>
      <Heading>Test Your Focus</Heading>

      <Meter height={METER_HEIGHT} value={state.value} />

      <Button onClick={handleClick}>Click</Button>
    </Wrap>
  )
}

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded border-2 border-gray-200 p-6 shadow-md dark:border-slate-700">
      {children}
    </div>
  )
}

function Heading({ children }: { children: React.ReactNode }) {
  return <div className="font-sans text-lg font-bold">{children}</div>
}

const Meter = React.memo(function Meter({
  height,
  value,
}: {
  height: number
  value: number
}) {
  return (
    <div
      className="relative w-[50px] rounded border-2 border-gray-300"
      style={{ height }}
    >
      <div
        className="absolute bottom-0 left-0 w-full bg-accent"
        style={{ height: `${value}%`, transition: 'height 66ms ease' }}
      />
    </div>
  )
})
