import React from 'react'
import { CounterUI } from './_CounterUI'

export default function LocalCounter({ initialValue = 0 }) {
  const [count, setCount] = React.useState(initialValue)

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(initialValue)

  return (
    <CounterUI
      count={count}
      increment={increment}
      decrement={decrement}
      reset={reset}
    />
  )
}
