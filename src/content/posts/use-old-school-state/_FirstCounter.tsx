import React from 'react'
import { Button } from '../../../components/Button'

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
      callbackRef.current()
      callbackRef.current = null
    }
  })

  return [state, wrappedSetState]
}

export default function Counter() {
  const [state, setState] = useOldSchoolState(0)

  const inc = () => {
    setState(
      s => s + 1,
      () => {
        console.log(`Count went up to ${state}`)
      },
    )
  }

  const dec = () => {
    setState(
      s => s - 1,
      () => {
        console.log(`Count went down to ${state}`)
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
