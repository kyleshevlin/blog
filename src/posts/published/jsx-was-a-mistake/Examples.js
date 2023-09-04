import React from 'react'
import { Margin, useSpacing } from '@kyleshevlin/layout'
import Button from '../../../components/Button'
import useForceUpdate from '../../../hooks/useForceUpdate'
import { randomRGB } from '../../../utils'

export function Box({ children }) {
  const bs = useSpacing()
  const backgroundColor = randomRGB()

  return (
    <div
      data-background-color={backgroundColor}
      style={{ backgroundColor, padding: bs(1) }}
    >
      {children}
    </div>
  )
}

export function NoChildrenExample() {
  const forceUpdate = useForceUpdate()

  return (
    <Box>
      <Button onClick={forceUpdate}>Update</Button>
    </Box>
  )
}

export function ChildrenExample({ children }) {
  const forceUpdate = useForceUpdate()

  return (
    <Box>
      <Button onClick={forceUpdate}>Update</Button>
      <Margin top={0.5}>{children}</Margin>
    </Box>
  )
}
