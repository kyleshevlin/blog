import React from 'react'
import Button from '../../../components/Button'
import Margin from '../../../components/Margin'
import useForceUpdate from '../../../hooks/useForceUpdate'
import { bs } from '../../../shevy'
import { randomRGB } from '../../../utils'

export function Box({ children }) {
  const backgroundColor = randomRGB()

  return (
    <div
      data-background-color={backgroundColor}
      style={{ backgroundColor, padding: bs() }}
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
