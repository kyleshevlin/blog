import React from 'react'
import { bs } from '../shevy'
import { v } from '../utils'

export default function PostDate({ date }) {
  return (
    <div css={{ marginBottom: bs(0.75) }}>
      <div
        css={{
          display: 'inline-block',
          fontFamily: v('fonts-catamaran'),
          fontSize: '0.75187rem',
          lineHeight: 1.8,
          paddingLeft: '2px',
          paddingRight: '2px',
          borderBottom: `3px solid ${v('colors-accent')}`,
        }}
      >
        {date}
      </div>
    </div>
  )
}
