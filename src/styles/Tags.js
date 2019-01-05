import React from 'react'
import { Global, css } from '@emotion/core'
import { lighten } from 'polished'
import { BREAKPOINTS, COLORS } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'

const GlobalStyles = () => (
  <Global
    styles={css`
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      html {
        font-family: 'Droid Serif', serif;
        font-size: 85%;
        line-height: 1.6;
        box-sizing: border-box;

        ${createMediaQuery(BREAKPOINTS.alpha)} {
          font-size: 100%;
        }

        ${createMediaQuery(BREAKPOINTS.delta)} {
          font-size: 115%;
        }
      }

      body {
        min-height: 100vh;
        background-color: ${COLORS.white};
        color: ${COLORS.black};
        position: relative;
      }

      a {
        color: ${COLORS.teal};
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: ${lighten(0.1, COLORS.teal)};
        }
      }

      img {
        max-width: 100%;
        height: auto;
      }

      ul,
      ol {
        margin-bottom: ${bs()};
      }

      pre,
      pre[class*='language-'] {
        margin-top: 0;
        margin-bottom: ${bs()};
        padding: ${bs(0.5)};
      }

      pre code {
        background: transparent;
      }

      code {
        display: inline-block;
        background-color: ${COLORS.lightGray};
        padding-top: 0;
        padding-bottom: 0;
        padding-left: ${bs(0.25)};
        padding-right: ${bs(0.25)};
        border-radius: 3px;
      }
    `}
  />
)

export default GlobalStyles
