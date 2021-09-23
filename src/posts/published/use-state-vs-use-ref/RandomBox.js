import React from 'react'
import Button from '../../../components/Button'
import useForceUpdate from '../../../hooks/useForceUpdate'
import { bs } from '../../../shevy'
import { randomRGB } from '../../../utils'

export default function RandomBox() {
  const forceUpdate = useForceUpdate()

  return (
    <div
      css={{
        backgroundColor: randomRGB(),
        padding: bs(),
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Button onClick={forceUpdate}>Force Update</Button>
    </div>
  )
}
