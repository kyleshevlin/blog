import React from 'react'
import Button from '../../../components/Button'
import { useSpacing } from '@kyleshevlin/layout'

function useOldSchoolState(initialState) {
  const [state, setState] = React.useState(initialState)
  const callbackRef = React.useRef(null)

  const wrappedSetState = React.useCallback((update, callback) => {
    setState(update)

    if (callback) {
      callbackRef.current = callback
    }
  }, [])

  React.useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state)
      callbackRef.current = null
    }
  }, [state])

  return [state, wrappedSetState]
}

export default function Counter() {
  const bs = useSpacing()

  const [state, setState] = useOldSchoolState(0)

  const inc = () => {
    setState(
      s => s + 1,
      nextState => {
        console.log(`Count went up to ${nextState}`)
      }
    )
  }

  const dec = () => {
    setState(
      s => s - 1,
      nextState => {
        console.log(`Count went down to ${nextState}`)
      }
    )
  }

  return (
    <div>
      <div css={{ marginBottom: bs(0.5) }}>Count: {state}</div>
      <div css={{ 'button + button': { marginLeft: bs(0.5) } }}>
        <Button onClick={inc}>+</Button>
        <Button onClick={dec}>-</Button>
      </div>
    </div>
  )
}
