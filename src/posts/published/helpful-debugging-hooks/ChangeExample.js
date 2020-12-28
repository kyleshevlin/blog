import React from 'react'
import Button from '../../../components/Button'
import { bs } from '../../../shevy'

const rng = () => Math.trunc(Math.random() * 100)

export default function ChangeExample() {
  const [randomNumber, setRandomNumber] = React.useState(rng())

  return (
    <div>
      <Display value={randomNumber} />
      <Button onClick={() => setRandomNumber(rng())}>New Number</Button>
    </div>
  )
}

function Display(props) {
  useChangeDebugger(props)

  return (
    <div css={{ marginBottom: bs(0.5) }}>
      <p>Be sure to open the console and see the logged out changes!</p>
      <div>Current Value: {props.value}</div>
    </div>
  )
}

function usePrevious(value) {
  const ref = React.useRef()

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function useChangeDebugger(value) {
  const previousValue = usePrevious(value)
  const changes = getChanges(previousValue, value)

  if (changes.length) {
    changes.forEach(change => {
      console.log(change)
    })
  }
}

function getChanges(previousValue, currentValue) {
  // Handle non-null objects
  if (
    typeof previousValue === 'object' &&
    previousValue !== null &&
    typeof currentValue === 'object' &&
    currentValue !== null
  ) {
    return Object.entries(currentValue).reduce((acc, cur) => {
      const [key, value] = cur
      const oldValue = previousValue[key]

      if (value !== oldValue) {
        acc.push({
          name: key,
          previousValue: oldValue,
          currentValue: value,
        })
      }

      return acc
    }, [])
  }

  // Handle primitive values
  if (previousValue !== currentValue) {
    return [{ previousValue, currentValue }]
  }

  return []
}
