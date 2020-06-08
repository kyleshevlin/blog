import React from 'react'
import ButtonsWrap from './ButtonsWrap'
import Button from '../../../components/Button'

export default function LocalCounter({ initialValue = 0 }) {
  const [count, setCount] = React.useState(initialValue)

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(initialValue)

  return (
    <>
      <div>Count: {count}</div>
      <ButtonsWrap>
        <Button onClick={increment}>+1</Button>
        <Button onClick={decrement}>-1</Button>
        <Button onClick={reset}>reset</Button>
      </ButtonsWrap>
    </>
  )
}
