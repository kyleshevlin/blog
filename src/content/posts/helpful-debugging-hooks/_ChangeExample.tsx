import React from 'react'
import { Button } from '../../../components/Button'

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

function Display(props: { value: number }) {
  useChangeDebugger(props)

  return (
    <div className="mb-4">
      <p>Be sure to open the console and see the logged out changes!</p>
      <div>Current Value: {props.value}</div>
    </div>
  )
}

function usePrevious<T>(value: T) {
  const ref = React.useRef<T | undefined>()

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function useChangeDebugger<T>(value: T) {
  const previousValue = usePrevious(value)
  const changes = getChanges(previousValue, value)

  if (changes.length) {
    changes.forEach(change => {
      console.log(change)
    })
  }
}

function getChanges<T>(previousValue: T, currentValue: T) {
  // Handle non-null objects
  if (
    typeof previousValue === 'object' &&
    previousValue !== null &&
    typeof currentValue === 'object' &&
    currentValue !== null
  ) {
    return Object.entries(currentValue).reduce((acc, cur) => {
      const [key, value] = cur
      // @ts-expect-error TODO:
      const oldValue = previousValue[key]

      if (value !== oldValue) {
        // @ts-expect-error TODO:
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
