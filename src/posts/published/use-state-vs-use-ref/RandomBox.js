import React from 'react'
import Button from '../../../components/Button'
import useForceUpdate from '../../../hooks/useForceUpdate'
import { randomRGB } from '../../../utils'
import { useSpacing } from '@kyleshevlin/layout'

export default function RandomBox() {
  const bs = useSpacing()
  const forceUpdate = useForceUpdate()

  return (
    <div
      css={{
        backgroundColor: randomRGB(),
        padding: bs(1),
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Button onClick={forceUpdate}>Force Update</Button>
    </div>
  )
}
