import React from 'react'
import Flex from '../../../components/Flex'

export default function Example() {
  return (
    <Flex justify="space-between" style={{ position: 'relative' }}>
      <div>Logo</div>
      <div
        css={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        H1 Content here
      </div>
      <div>Small Nav</div>
    </Flex>
  )
}
