import React from 'react'
import Button from '../../../components/Button'
import { useSpacing } from '@kyleshevlin/layout'

function createQueue() {
  const queue = []

  return {
    add(item) {
      queue.unshift(item)
    },
    remove() {
      return queue.pop()
    },
    get length() {
      return queue.length
    },
  }
}

function useOldSchoolState(initialState) {
  const [state, setState] = React.useState(initialState)
  const queue = React.useRef(createQueue())

  const wrappedSetState = React.useCallback((update, callback) => {
    setState(update)

    if (callback) {
      queue.current.add(callback)
    }
  }, [])

  React.useEffect(() => {
    if (queue.current.length) {
      queue.current.remove()(state)
    }
  }, [queue.current.length, state])

  return [state, wrappedSetState]
}

export default function SecondDoubleStepper() {
  const bs = useSpacing()
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
