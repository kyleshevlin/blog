import React from 'react'
import { Button } from '../../../components/Button'

const FPS = 1000 / 15
const METER_HEIGHT = 300
const MODIFIER_MAX = 10
const MODIFIER_DECAY_MULTIPLIER = 0.95

type Status = 'idle' | 'running'

type State = {
  decay: number
  executiveDysfunction: boolean
  impulse: number
  modifiedDecay: number
  modifiedImpulse: number
  modifiers: {
    novelty: number
    interest: number
    challenge: number
    urgency: number
  }
  status: Status
  understimulated: boolean
  understimulatedClickCount: number
  understimulatedClickCountLimit: number
  understimulatedIndex: number
  value: number
}

const getInitialState = ({
  decay,
  executiveDysfunction,
  impulse,
  understimulated,
}: {
  decay: number
  executiveDysfunction: boolean
  impulse: number
  understimulated: boolean
}): State => ({
  decay,
  executiveDysfunction,
  impulse,
  modifiedDecay: 0,
  modifiedImpulse: 0,
  modifiers: {
    novelty: 0,
    interest: 0,
    challenge: 0,
    urgency: 0,
  },
  status: 'idle',
  understimulated,
  understimulatedClickCount: 0,
  understimulatedClickCountLimit: Math.ceil(Math.random() * 10),
  understimulatedIndex: Math.floor(Math.random() * 5),
  value: 0,
})

function normalizeImpulse(value: number) {
  return (value * METER_HEIGHT) / 100
}

type Action =
  | { type: 'TICK' }
  | { type: 'CLICK'; payload: { index?: number } }
  | { type: 'UPDATE_MODIFIER'; payload: { key: string; value: number } }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TICK': {
      const nextValue = Math.max(
        0,
        state.value - (state.decay - state.modifiedDecay),
      )

      return {
        ...state,
        status: nextValue > 0 ? 'running' : 'idle',
        value: nextValue,
      }
    }

    case 'CLICK': {
      const { index } = action.payload

      if (state.understimulated && index !== state.understimulatedIndex) {
        return state
      }

      let nextClickCount = state.understimulatedClickCount
      let nextLimit = state.understimulatedClickCountLimit
      let nextIndex = state.understimulatedIndex

      if (state.understimulated && index === nextIndex) {
        nextClickCount++

        if (nextClickCount >= state.understimulatedClickCountLimit) {
          nextClickCount = 0
          nextLimit = Math.ceil(Math.random() * 10)
          nextIndex = Math.floor(Math.random() * 5)
        }
      }

      return {
        ...state,
        status: 'running',
        understimulatedClickCount: nextClickCount,
        understimulatedClickCountLimit: nextLimit,
        understimulatedIndex: nextIndex,
        value: Math.min(
          100,
          state.value + normalizeImpulse(state.impulse + state.modifiedImpulse),
        ),
      }
    }

    case 'UPDATE_MODIFIER': {
      let modifiedDecay = 0
      let modifiedImpulse = 0

      if (!state.executiveDysfunction) {
        const modifierTotal = Object.values(state.modifiers).reduce(
          (acc, value) => acc + value,
          0,
        )
        const modifiersLength = Object.keys(state.modifiers).length
        const modifierPercent = modifierTotal / (MODIFIER_MAX * modifiersLength)
        modifiedDecay =
          state.decay * modifierPercent * MODIFIER_DECAY_MULTIPLIER
        modifiedImpulse = modifierTotal
      }

      return {
        ...state,
        modifiedDecay,
        modifiedImpulse,
        modifiers: {
          ...state.modifiers,
          [action.payload.key]: action.payload.value,
        },
      }
    }

    default:
      return state
  }
}

// Let's not recreate objects we don't need to
const TICK: Action = { type: 'TICK' }

type TestYourMightProps = {
  decay: number
  executiveDysfunction?: boolean
  impulse: number
  simulationModifiers?: boolean
  subtitle: string
  understimulated?: boolean
}

export function TestYourMight({
  decay,
  executiveDysfunction = false,
  impulse,
  simulationModifiers = false,
  subtitle,
  understimulated = false,
}: TestYourMightProps) {
  const [state, dispatch] = React.useReducer(
    reducer,
    getInitialState({ decay, executiveDysfunction, impulse, understimulated }),
  )

  const handleClick = React.useCallback((index?: number) => {
    dispatch({ type: 'CLICK', payload: { index } })
  }, [])

  React.useEffect(() => {
    const id = setInterval(() => {
      if (state.status === 'running') {
        dispatch(TICK)
      }
    }, FPS)

    return () => clearInterval(id)
  }, [state.status])

  return (
    <div className="stack items-center gap-4 rounded border-2 border-gray-200 p-6 shadow-md dark:border-slate-700">
      <div className="stack items-center gap-1">
        <div className="font-sans text-lg font-bold">Test Your Focus</div>
        <div className="font-sans text-sm">{subtitle}</div>
      </div>
      <div
        className="relative w-[50px] rounded border-2 border-gray-300 dark:border-slate-700"
        style={{ height: METER_HEIGHT }}
      >
        <div
          className="absolute bottom-0 left-0 w-full bg-accent"
          style={{
            height: `${state.value}%`,
            transition: 'height 66ms ease',
          }}
        />

        <div className="absolute bottom-[70%] left-0 h-[2px] w-full bg-black dark:bg-white" />
      </div>

      {simulationModifiers && (
        <div className="stack items-center gap-1 font-sans">
          <div className="font-bold">Modifiers</div>
          <div className="grid grid-cols-2 gap-1">
            {Object.entries(state.modifiers).map(([key, value]) => (
              <div className="stack items-center gap-1" key={key}>
                <label htmlFor={key}>
                  {key}: {value}
                </label>
                <input
                  id={key}
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  onChange={e => {
                    dispatch({
                      type: 'UPDATE_MODIFIER',
                      payload: { key, value: e.target.valueAsNumber },
                    })
                  }}
                  value={value}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {understimulated ? (
        <div className="row gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Button key={index} onClick={() => handleClick(index)}>
              Click
            </Button>
          ))}
        </div>
      ) : (
        <Button onClick={() => handleClick()}>Click</Button>
      )}
    </div>
  )
}
