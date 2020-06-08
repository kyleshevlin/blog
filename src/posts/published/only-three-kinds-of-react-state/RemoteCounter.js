import React from 'react'
import ButtonsWrap from './ButtonsWrap'
import Button from '../../../components/Button'

const CounterContext = React.createContext()

export function CounterProvider({ children, initialValue = 0 }) {
  const [count, setCount] = React.useState(initialValue)

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(initialValue)

  return (
    <CounterContext.Provider
      value={{
        count,
        decrement,
        increment,
        reset,
      }}
    >
      {children}
    </CounterContext.Provider>
  )
}

const useCounterContext = () => React.useContext(CounterContext)

export function RemoteCounter() {
  const { count, decrement, increment, reset } = useCounterContext()

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
