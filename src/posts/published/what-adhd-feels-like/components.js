import React from 'react'
import { Row, Stack } from '@kyleshevlin/layout'
import Button from '../../../components/Button'

const FPS = 1000 / 15

const initialState = {
  impulse: 10,
  decay: 2.5,
  level: 0,
}

function reducer(state, action) {
  action = typeof action === 'string' ? { type: action } : action

  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        level: Math.max(0, state.level - state.decay),
      }

    case 'CLICK':
      return {
        ...state,
        level: Math.min(100, state.level + state.impulse),
      }

    case 'UPDATE_IMPULSE':
      return {
        ...state,
        impulse: action.payload,
      }

    case 'UPDATE_DECAY':
      return {
        ...state,
        decay: action.payload,
      }

    default:
      return state
  }
}

export function TestYourMight() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const handleClick = React.useCallback(() => {
    dispatch('CLICK')
  }, [])

  React.useEffect(() => {
    const id = setInterval(() => {
      dispatch('TICK')
    }, FPS)

    return () => clearInterval(id)
  }, [])

  return (
    <Stack align="center" gap={1}>
      <div
        style={{
          border: '2px solid var(--colors-offsetMore)',
          borderRadius: 2,
          width: 50,
          height: 300,
          position: 'relative',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--colors-accent)',
            height: `${state.level}%`,
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            transition: 'height 66ms ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: `80%`,
            left: 0,
            width: '100%',
            height: 2,
            backgroundColor: 'black',
          }}
        />
      </div>

      <Row align="center" gap={2}>
        <Stack>
          <label htmlFor="impulse">Impulse: {state.impulse}</label>
          <input
            type="range"
            id="impulse"
            name="impulse"
            value={state.impulse}
            onChange={e => {
              dispatch({
                type: 'UPDATE_IMPULSE',
                payload: parseInt(e.target.value, 10),
              })
            }}
            min={0}
            max={100}
            step={1}
          />
        </Stack>

        <Stack>
          <label htmlFor="decay">Decay: {state.decay}</label>
          <input
            type="range"
            id="decay"
            name="decay"
            value={state.decay}
            onChange={e => {
              dispatch({
                type: 'UPDATE_DECAY',
                payload: parseFloat(e.target.value),
              })
            }}
            min={0}
            max={10}
            step={0.01}
          />
        </Stack>
      </Row>

      <Button onClick={handleClick}>CLICK</Button>
    </Stack>
  )
}
