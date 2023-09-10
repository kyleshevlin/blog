import React from 'react'
import { kase } from './kase'
import Button from '../../../components/Button'
import { Flex } from '@kyleshevlin/layout'

const rng = () => Math.round(Math.random() * 100)

export function RandomNumber() {
  const [state, setState] = React.useState(rng())
  const handleClick = React.useCallback(() => {
    setState(rng())
  }, [])

  const text = kase(state)
    .when(
      x => x <= 33,
      () => 'Low'
    )
    .when(
      x => x <= 67,
      () => 'Mid'
    )
    .when(69, () => 'Nice!')
    .otherwise(() => 'High')

  return (
    <div css={{ fontFamily: 'var(--fonts-secondary)' }}>
      <Flex align="baseline" gap={1}>
        <Button onClick={handleClick}>Try again</Button>
        <div>State: {state}</div>
        <div>Response: {text}</div>
      </Flex>
    </div>
  )
}
