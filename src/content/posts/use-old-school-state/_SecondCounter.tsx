import React from 'react'
import { Button } from '../../../components/Button'

function useOldSchoolState<T>(initialState: T) {
  type Update = T | ((currentState: T) => T)
  type Callback = (nextState: T) => void

  const [state, setState] = React.useState(initialState)
  const callbackRef = React.useRef<Callback | null>(null)

  const wrappedSetState = React.useCallback(
    (update: Update, callback: Callback) => {
      setState(update)

      if (callback) {
        callbackRef.current = callback
      }
    },
    [],
  )

  React.useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state)
      callbackRef.current = null
    }
  }, [state])

  return [state, wrappedSetState] as const
}

export default function Counter() {
  const [state, setState] = useOldSchoolState(0)

  const inc = () => {
    setState(
      s => s + 1,
      nextState => {
        console.log(`Count went up to ${nextState}`)
      },
    )
  }

  const dec = () => {
    setState(
      s => s - 1,
      nextState => {
        console.log(`Count went down to ${nextState}`)
      },
    )
  }

  return (
    <div className="flex flex-col gap-2 font-sans">
      <div>Count: {state}</div>
      <div className="flex gap-2">
        <Button onClick={inc}>+</Button>
        <Button onClick={dec}>-</Button>
      </div>
    </div>
  )
}
