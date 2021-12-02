import React from 'react'
import { Global, css } from '@emotion/core'
import { bs } from '../shevy'

const GlobalStyles = () => (
  <Global
    styles={css`
      .twitter-tweet-rendered {
        margin-top: ${bs()} !important;
        margin-right: auto;
        margin-bottom: ${bs()} !important;
        margin-left: auto;
      }
    `}
  />
)

export default GlobalStyles
