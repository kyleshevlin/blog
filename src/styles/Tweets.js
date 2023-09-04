import React from 'react'
import { Global, css } from '@emotion/core'
import { useSpacing } from '@kyleshevlin/layout'

const GlobalStyles = () => {
  const bs = useSpacing()

  return (
    <Global
      styles={css`
        .twitter-tweet-rendered {
          margin-top: ${bs(1)} !important;
          margin-right: auto;
          margin-bottom: ${bs(1)} !important;
          margin-left: auto;
        }
      `}
    />
  )
}

export default GlobalStyles
