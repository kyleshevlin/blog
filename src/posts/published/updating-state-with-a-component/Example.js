import React from 'react'
import Flex from '../../../components/Flex'
import { bs } from '../../../shevy'

export default function Example() {
  return (
    <div>
      <Flex
        justify="space-between"
        style={{
          backgroundColor: 'var(--colors-background)',
          borderBottom: '2px solid var(--colors-offsetMore)',
          position: 'relative',
          padding: bs(0.5),
        }}
      >
        <div>Logo</div>
        <div
          css={{
            fontFamily: 'var(--fonts-catamaran)',
            fontWeight: 'bold',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          H1 Content here
        </div>
        <div>Small Nav</div>
      </Flex>
      <div
        css={{
          backgroundColor: 'var(--colors-background)',
          padding: bs(),
          textAlign: 'center',
        }}
      >
        Page Content
      </div>
    </div>
  )
}
