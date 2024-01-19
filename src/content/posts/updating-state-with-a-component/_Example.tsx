import React from 'react'
import { Flex, useSpacing } from '@kyleshevlin/layout'

export default function Example() {
  const bs = useSpacing()

  return (
    <div
      css={{
        backgroundColor: 'var(--colors-background)',
        borderBottom: '2px solid var(--colors-offsetMore)',
        position: 'relative',
        padding: bs(0.5),
      }}
    >
      <Flex justify="space-between">
        <div>Logo</div>
        <div
          css={{
            fontFamily: 'var(--fonts-secondary)',
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
          padding: bs(1),
          textAlign: 'center',
        }}
      >
        Page Content
      </div>
    </div>
  )
}
