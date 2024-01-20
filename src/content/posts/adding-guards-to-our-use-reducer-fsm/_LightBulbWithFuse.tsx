import React from 'react'
import { BulbWrap } from '../../../components/bulbs/BulbWrap'
import {
  BrokenBulbSVG,
  BrokenFuseSVG,
  BulbSVG,
  FuseSVG,
} from '../../../components/bulbs/BulbSvgs'
import { toArray, toEventObject, toTransitionObject } from '../../../utils'

const initialState = {
  current: 'unlit',
  data: {
    color: 'white',
    hasFuse: true,
  },
}

const BREAK_EVENT = {
  BREAK: [{ target: 'brokenFuse', cond: 'hasFuse' }, 'brokenBulb'],
}
const RESET_EVENT = { RESET: initialState.current }

const NEXT_STATE_GRAPH = {
  lit: {
    ...BREAK_EVENT,
    ...RESET_EVENT,
    CHANGE_COLOR: 'lit',
    TOGGLE: 'unlit',
    TOGGLE_FUSE: 'lit',
  },
  unlit: {
    ...BREAK_EVENT,
    ...RESET_EVENT,
    TOGGLE: 'lit',
    TOGGLE_FUSE: 'unlit',
  },
  brokenBulb: {
    ...RESET_EVENT,
  },
  brokenFuse: {
    ...RESET_EVENT,
  },
}

const GUARDS = {
  // @ts-expect-error TODO:
  hasFuse: data => data.hasFuse,
}

// @ts-expect-error TODO:
const stateReducer = (state, event, data) => {
  // @ts-expect-error TODO:
  const transitionValue = NEXT_STATE_GRAPH[state.current][event.type]

  if (!transitionValue) return

  const possibleTransitions = toArray(transitionValue).map(toTransitionObject)

  for (const transition of possibleTransitions) {
    const { target, cond = () => true } = transition
    // @ts-expect-error TODO:
    const condFn = typeof cond === 'string' ? GUARDS[cond] : cond

    if (condFn(data, event)) {
      return target
    }
  }

  return
}

const DATA_UPDATERS = {
  // @ts-expect-error TODO:
  CHANGE_COLOR: (data, eventObj) => ({ ...data, color: eventObj.color }),
  RESET: () => initialState.data,
  // @ts-expect-error TODO:
  TOGGLE_FUSE: data => ({ ...data, hasFuse: !data.hasFuse }),
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
  const nextData = dataReducer(state.data, eventObj)
  const nextState = stateReducer(state, eventObj, nextData)

  if (!nextState) return state

  return {
    current: nextState,
    data: nextData,
  }
}

const events = ['TOGGLE', 'BREAK', 'RESET', 'TOGGLE_FUSE']
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
      state={state}
      events={events}
      colors={colors}
      send={send}
      title="Light Bulb with a Fuse"
    >
      <div>
        {(current === 'unlit' || current === 'brokenFuse') && (
          <BulbSVG color="none" />
        )}
        {/* @ts-expect-error TODO: */}
        {current === 'lit' && <BulbSVG color={COLOR_MAP[data.color]} />}
        {current === 'brokenBulb' && <BrokenBulbSVG />}
      </div>
      {data.hasFuse && (
        <div className="p-8">
          {current === 'brokenFuse' ? <BrokenFuseSVG /> : <FuseSVG />}
        </div>
      )}
    </BulbWrap>
  )
}
