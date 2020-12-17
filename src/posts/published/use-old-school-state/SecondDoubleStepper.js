import React from 'react'
import Button from '../../../components/Button'
import { bs } from '../../../shevy'

function useOldSchoolState(initialState) {
  const [state, setState] = React.useState(initialState)
  const callbackRef = React.useRef(null)

  const wrappedSetState = React.useCallback((update, callback) => {
    console.log('starting wrappedSetState')
    setState(update)

    if (callback) {
      console.log('setting callbackRef')
      callbackRef.current = callback
    }
  }, [])

  React.useEffect(() => {
    console.log('starting effect')
    if (callbackRef.current) {
      callbackRef.current(state)
      console.log('nullifying callbackRef')
      callbackRef.current = null
    }
  }, [state])

  return [state, wrappedSetState]
}

export default function SecondDoubleStepper() {
  const [state, setState] = useOldSchoolState(0)

  const step = () => {
    setState(
      s => s + 1,
      ns1 => {
        console.log('first callback', ns1)
        setState(
          s => s + 1,
          ns2 => {
            console.log('second callback', ns2)
          }
        )
      }
    )
  }

  return (
    <div>
      <div css={{ marginBottom: bs(0.5) }}>Steps: {state}</div>
      <Button onClick={step}>Step</Button>
    </div>
  )
}
