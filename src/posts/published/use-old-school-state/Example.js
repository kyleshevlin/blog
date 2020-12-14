import React from 'react'
import Button from '../../../components/Button'
import { bs } from '../../../shevy'

function makeQueue() {
  const queue = []

  return {
    get length() {
      return queue.length
    },
    add(item) {
      queue.push(item)
    },
    remove() {
      return queue.shift.item()
    }
  }
}

function useOldSchoolState(initialState) {
  const [state, setState] = React.useState(initialState)
  const queue = React.useRef(makeQueue())

  const wrappedSetState = (update, callback) => {
    if (callback) {
      queue.current.add(callback)
    }

    setState(update)
  }

  React.useEffect(
    () => {
      if (queue.current.length) {
        queue.current.remove()(state)
      }
    },
    [state, queue.current.length]
  )

  return [state, wrappedSetState]
}

export default function Example() {
  const [state, setState] = useOldSchoolState(0)

  const inc = () => {
    setState(
      s => s + 1,
      s => {
        console.log(`Count went up to ${s}`)
      }
    )
  }

  const dec = () => {
    setState(
      s => s - 1,
      s => {
        console.log(`Count went down to ${s}`)
      }
    )
  }

  return (
    <div>
      <div css={{ marginBottom: bs(0.5) }}>Count: {state}</div>
      <div css={{ 'button + button': { marginLeft: bs(.5) } }}>
        <Button onClick={inc}>+</Button>
        <Button onClick={dec}>-</Button>
      </div>
    </div>
  )
}
