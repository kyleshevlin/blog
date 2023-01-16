import React from 'react'
import Button from '../../../components/Button'
import { Flex } from '@kyleshevlin/layout'
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
    <Flex direction="column" gap={1}>
      <div>
        <Button onClick={forceUpdate}>Force Update</Button>
      </div>
      <Box />
    </Flex>
  )
}
