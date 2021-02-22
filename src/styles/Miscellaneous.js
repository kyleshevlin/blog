import React from 'react'
import { Global } from '@emotion/core'
import { bs } from '../shevy'

export default function Miscellaneous() {
  return (
    <Global
      styles={{
        '.gatsby-resp-image-wrapper': {
          boxShadow: '0 4px 8px var(--colors-offsetMore)',
          marginTop: bs(2),
          marginBottom: bs(2),
        },
        '.gatsby-highlight-code-line': {
          backgroundColor: `rgba(255, 255, 255, 0.075)`,
          display: 'block',
          marginLeft: bs(-0.25),
          marginRight: bs(-0.25),
          paddingLeft: bs(0.25),
          paddingRight: bs(0.25),
        },
      }}
    />
  )
}
