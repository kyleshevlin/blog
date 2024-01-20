import React from 'react'
import { toEventObject } from '../../../utils'
import { BulbWrap } from '../../../components/bulbs/BulbWrap'
import { BrokenBulbSVG, BulbSVG } from '../../../components/bulbs/BulbSvgs'

const initialState = {
  current: 'unlit',
  data: {
    color: 'white',
  },
}

const BREAK_EVENT = { BREAK: 'broken' }
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
}

// @ts-expect-error TODO:
const stateReducer = (state, event) =>
  // @ts-expect-error TODO:
  NEXT_STATE_GRAPH[state.current][event.type]

const DATA_UPDATERS = {
  // @ts-expect-error TODO:
  CHANGE_COLOR: (data, eventObj) => ({ ...data, color: eventObj.color }),
  RESET: () => initialState.data,
}

// @ts-expect-error TODO:
const dataReducer = (data, eventObj) => {
  // @ts-expect-error TODO:
  const updater = DATA_UPDATERS[eventObj.type]
  return updater ? updater(data, eventObj) : data
}

// @ts-expect-error TODO:
const reducer = (state, event) => {
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

export default function HueLightBulb() {
  const [state, send] = React.useReducer(reducer, initialState)
  const { current, data } = state

  return (
    <BulbWrap
      colors={colors}
      events={normalEvents}
      send={send}
      state={state}
      title=""
    >
      {current === 'unlit' && <BulbSVG color="none" />}
      {/* @ts-expect-error TODO: */}
      {current === 'lit' && <BulbSVG color={COLOR_MAP[data.color]} />}
      {current === 'broken' && <BrokenBulbSVG />}
    </BulbWrap>
  )
}
