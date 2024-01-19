import React from 'react'
import generateContext from 'react-generate-context'
import { Button } from '../../../components/Button'

const useCounterValue = ({ startingCount = 0 }) => {
  const [state, setState] = React.useState(startingCount)
  const handlers = React.useMemo(
    () => ({
      inc: () => {
        setState(s => s + 1)
      },
      dec: () => {
        setState(s => s - 1)
      },
    }),
    [],
  )

  return [state, handlers] as const
}

const [CounterProvider, useCounter] = generateContext(useCounterValue)

function Counter() {
  const [count, { inc, dec }] = useCounter()

  return (
    <div className="flex flex-col gap-2">
      <div className="font-sans">{count}</div>

      <div className="flex gap-2">
        <Button onClick={inc}>+</Button>
        <Button onClick={dec}>-</Button>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <CounterProvider startingCount={100}>
      <Counter />
    </CounterProvider>
  )
}
