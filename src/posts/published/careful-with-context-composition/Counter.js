import { Flex } from '@kyleshevlin/layout'
import React from 'react'
import generateContext from 'react-generate-context'
import Button from '../../../components/Button'

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
    <Flex direction="column" gap={0.5}>
      <div>{count}</div>
      <Flex gap={0.5}>
        <Button onClick={inc}>+</Button>
        <Button onClick={dec}>-</Button>
      </Flex>
    </Flex>
  )
}

export default function App() {
  return (
    <CounterProvider startingCount={100}>
      <Counter />
    </CounterProvider>
  )
}
