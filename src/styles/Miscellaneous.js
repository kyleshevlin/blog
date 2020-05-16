import React from 'react'
import { Global } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { bs } from '../shevy'

export default function Miscellaneous() {
  const theme = useTheme()

  return (
    <Global
      styles={{
        '.gatsby-resp-image-wrapper': {
          boxShadow: `0 4px 8px ${theme.colors.offsetMore}`,
          marginTop: bs(2),
          marginBottom: bs(2),
        },
      }}
    />
  )
}
