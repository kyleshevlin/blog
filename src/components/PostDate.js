import React from 'react'
import { useTheme } from 'emotion-theming'
import { bs } from '../shevy'

export default function PostDate({ date }) {
  const theme = useTheme()

  return (
    <div css={{ marginBottom: bs(0.75) }}>
      <div
        css={{
          display: 'inline-block',
          fontFamily: theme.fonts.catamaran,
          fontSize: '0.75187rem',
          lineHeight: 1.8,
          paddingLeft: '2px',
          paddingRight: '2px',
          borderBottom: `3px solid ${theme.colors.accent}`
        }}
      >
        {date}
      </div>
    </div>
  )
}
