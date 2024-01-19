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
  hasFuse: data => data.hasFuse,
}

const stateReducer = (state, event, data) => {
  const transitionValue = NEXT_STATE_GRAPH[state.current][event.type]

  if (!transitionValue) return

  const possibleTransitions = toArray(transitionValue).map(toTransitionObject)

  for (const transition of possibleTransitions) {
    const { target, cond = () => true } = transition
    const condFn = typeof cond === 'string' ? GUARDS[cond] : cond

    if (condFn(data, event)) {
      return target
    }
  }

  return
}

const DATA_UPDATERS = {
  CHANGE_COLOR: (data, eventObj) => ({ ...data, color: eventObj.color }),
  RESET: () => initialState.data,
  TOGGLE_FUSE: data => ({ ...data, hasFuse: !data.hasFuse }),
}

const dataReducer = (data, eventObj) => {
  const updater = DATA_UPDATERS[eventObj.type]
  return updater ? updater(data, eventObj) : data
}

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
