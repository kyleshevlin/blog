import React from 'react'
import generateContext from 'react-generate-context'
import Button from '../../../components/Button'
import Margin from '../../../components/Margin'

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
    []
  )

  return [state, handlers]
}

const [CounterProvider, useCounter] = generateContext(useCounterValue)

function Counter() {
  const [count, { inc, dec }] = useCounter()

  return (
    <div>
      <Margin bottom={0.5}>{count}</Margin>
      <div css={{ display: 'flex' }}>
        <Margin right={0.5}>
          <Button onClick={inc}>+</Button>
        </Margin>
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
