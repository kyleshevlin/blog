import React from 'react'
import { kase } from './_kase'
import { Button } from '../../../components/Button'

const rng = () => Math.round(Math.random() * 100)

export function RandomNumber() {
  const [state, setState] = React.useState(rng())
  const handleClick = React.useCallback(() => {
    setState(rng())
  }, [])

  const text = kase(state)
    .when(
      x => x <= 33,
      () => 'Low',
    )
    .when(
      x => x <= 67,
      () => 'Mid',
    )
    .when(69, () => 'Nice!')
    .otherwise(() => 'High')

  return (
    <div className="flex items-center gap-4 font-sans">
      <Button onClick={handleClick}>Try again</Button>
      <div>State: {state}</div>
      <div>Response: {String(text)}</div>
    </div>
  )
}
