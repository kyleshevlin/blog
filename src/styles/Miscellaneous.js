import React from 'react'
import { Global } from '@emotion/core'
import { bs } from '../shevy'
import { v } from '../utils'

export default function Miscellaneous() {
  return (
    <Global
      styles={{
        '.gatsby-resp-image-wrapper': {
          boxShadow: `0 4px 8px ${v('colors-offsetMore')}`,
          marginTop: bs(2),
          marginBottom: bs(2),
        },
      }}
    />
  )
}
