import React from 'react'
import Button from '../../../components/Button'
import Margin from '../../../components/Margin'
// These can be found on my snippets page
import { randomRGB } from '../../../utils'
import useForceUpdate from '../../../hooks/useForceUpdate'
import { bs } from '../../../shevy'

function Box() {
  return (
    <div
      style={{
        backgroundColor: randomRGB(),
        borderRadius: 2,
        height: bs(4),
      }}
    />
  )
}

export default function App() {
  const forceUpdate = useForceUpdate()

  return (
    <div>
      <Margin bottom={1}>
        <Button onClick={forceUpdate}>Force Update</Button>
      </Margin>
      <Box />
    </div>
  )
}
