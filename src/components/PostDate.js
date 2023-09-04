import React from 'react'
import { useSpacing } from '@kyleshevlin/layout'

export default function PostDate({ date }) {
  const bs = useSpacing()

  return (
    <div css={{ marginBottom: bs(0.75) }}>
      <div
        css={{
          display: 'inline-block',
          fontFamily: 'var(--fonts-secondary)',
          fontSize: '0.75187rem',
          lineHeight: 1.8,
          paddingLeft: '2px',
          paddingRight: '2px',
          borderBottom: '3px solid var(--colors-accent)',
        }}
      >
        {date}
      </div>
    </div>
  )
}
