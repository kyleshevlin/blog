import React from 'react'
import { CounterUI } from './_CounterUI'

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
  const props = useCounterContext()

  return <CounterUI {...props} />
}

export function Single() {
  return (
    <CounterProvider>
      <RemoteCounter />
    </CounterProvider>
  )
}

export function TwoInOne() {
  return (
    <CounterProvider>
      <div className="flex flex-col gap-4">
        <RemoteCounter />
        <RemoteCounter />
      </div>
    </CounterProvider>
  )
}
