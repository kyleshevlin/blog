import React from 'react'
import { Button } from '../../../components/Button'

function createQueue<T>() {
  const queue = [] as T[]

  return {
    add(item: T) {
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

function useOldSchoolState<T>(initialState: T) {
  type Update = T | ((currentState: T) => T)
  type Callback = (nextState: T) => void

  const [state, setState] = React.useState(initialState)
  const queue = React.useRef(createQueue<Callback>())

  const wrappedSetState = React.useCallback(
    (update: Update, callback: Callback) => {
      setState(update)

      if (callback) {
        queue.current.add(callback)
      }
    },
    [],
  )

  React.useEffect(() => {
    if (queue.current.length) {
      queue.current.remove()?.(state)
    }
  }, [queue.current.length, state])

  return [state, wrappedSetState] as const
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
          },
        )
      },
    )
  }

  return (
    <div className="flex flex-col gap-2 font-sans">
      <div>Steps: {state}</div>
      <Button onClick={step}>Step</Button>
    </div>
  )
}
