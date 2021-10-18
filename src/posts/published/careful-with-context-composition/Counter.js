import React from 'react'
import generateContext from 'react-generate-context'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'

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
      <Spacer bottom={0.5}>{count}</Spacer>
      <div css={{ display: 'flex' }}>
        <Spacer right={0.5}>
          <Button onClick={inc}>+</Button>
        </Spacer>
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
