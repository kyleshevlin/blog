import React from 'react'
import { Button } from '../../../components/Button'
import useForceUpdate from '../../../hooks/useForceUpdate'
import { randomRGB } from '../../../utils'

export function Box({ children }: { children: React.ReactNode }) {
  const backgroundColor = randomRGB()

  return (
    <div
      className="flex flex-col gap-4 p-4"
      data-background-color={backgroundColor}
      style={{ backgroundColor }}
    >
      {children}
    </div>
  )
}

export function NoChildrenExample() {
  const forceUpdate = useForceUpdate()

  return (
    <Box>
      <div className="flex">
        <Button onClick={forceUpdate}>Update</Button>
      </div>
    </Box>
  )
}

export function ChildrenExample({ children }: { children: React.ReactNode }) {
  const forceUpdate = useForceUpdate()

  return (
    <Box>
      <div className="flex">
        <Button onClick={forceUpdate}>Update</Button>
      </div>
      <div>{children}</div>
    </Box>
  )
}
