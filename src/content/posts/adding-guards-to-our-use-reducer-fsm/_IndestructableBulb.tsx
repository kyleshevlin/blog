import React from 'react'
import { Button } from '../../../components/Button'
import { toEventObject, toTransitionObject } from '../../../utils'
import { BrokenBulbSVG, BulbSVG } from '../../../components/bulbs/BulbSvgs'

const initialState = {
  current: 'unlit',
  data: {
    color: 'white',
  },
}

const BREAK_EVENT = {
  BREAK: {
    target: 'broken',
    cond: () => false,
  },
}
const RESET_EVENT = { RESET: initialState.current }

const NEXT_STATE_GRAPH = {
  lit: {
    ...BREAK_EVENT,
    ...RESET_EVENT,
    CHANGE_COLOR: 'lit',
    TOGGLE: 'unlit',
  },
  unlit: {
    ...BREAK_EVENT,
    ...RESET_EVENT,
    TOGGLE: 'lit',
  },
  broken: {
    ...RESET_EVENT,
  },
} as const

const stateReducer = (state: any, event: any) => {
  // @ts-expect-error TODO:
  const nextState = NEXT_STATE_GRAPH[state.current][event.type]

  if (!nextState) return

  const possibleTransition = toTransitionObject(nextState)
  // Use default assignment to guarantee that `cond`
  // is a function and returns true if it's undefined
  const { target, cond = () => true } = possibleTransition

  // @ts-expect-error TODO:
  if (cond()) {
    return target
  }

  return
}

const DATA_UPDATERS = {
  CHANGE_COLOR: (data: any, eventObj: any) => ({
    ...data,
    color: eventObj.color,
  }),
  RESET: () => initialState.data,
}

const dataReducer = (data: any, eventObj: any) => {
  // @ts-expect-error TODO:
  const updater = DATA_UPDATERS[eventObj.type]
  return updater ? updater(data, eventObj) : data
}

const reducer = (state: any, event: any) => {
  const eventObj = toEventObject(event)
  const nextState = stateReducer(state, eventObj)

  if (!nextState) return state

  const nextData = dataReducer(state.data, eventObj)

  return {
    current: nextState,
    data: nextData,
  }
}

const normalEvents = ['TOGGLE', 'BREAK', 'RESET']
const colors = ['white', 'red', 'blue', 'green']

const COLOR_MAP = {
  white: '#feffeb',
  red: '#ff674f',
  blue: '#5cb6ff',
  green: '#8ff244',
}

export default function IndestructableBulb() {
  const [state, send] = React.useReducer(reducer, initialState)
  const { current, data } = state

  return (
    <div className="flex flex-col gap-4 rounded border-2 border-accent p-8">
      <h4 className="text-center font-sans">Indestructable Bulb</h4>

      <div className="flex justify-center">
        <div className="w-1/2 max-w-[240px] text-black dark:text-gray-700">
          {current === 'unlit' && <BulbSVG color="none" />}
          {/* @ts-expect-error TODO: */}
          {current === 'lit' && <BulbSVG color={COLOR_MAP[data.color]} />}
          {current === 'broken' && <BrokenBulbSVG />}
        </div>
      </div>

      <pre className="bg-gray-100 dark:bg-gray-800">
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>

      <div className="flex flex-col gap-2">
        <div>Events</div>
        <div className="flex gap-2">
          {normalEvents.map(event => (
            <Button key={event} onClick={() => send(event)}>
              {event}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div>Change Colors</div>
        <div className="flex gap-2">
          {colors.map(color => (
            <Button
              key={color}
              onClick={() => send({ type: 'CHANGE_COLOR', color })}
            >
              {color}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
