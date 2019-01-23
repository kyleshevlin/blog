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
        margin-top: ${bs(1.5)};
        margin-bottom: ${bs(1.5)};
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

      blockquote {
        background: ${COLORS.lightGray};
        color: ${COLORS.teal};
        font-family: 'Catamaran', sans-serif;
        font-size: 1.9531rem;
        line-height: 1.2;
        font-weight: 100;
        font-style: italic;
        padding: ${bs(1.5)};
        margin-bottom: ${bs()};
        border-left: 4px solid ${COLORS.teal};

        ${createMediaQuery(BREAKPOINTS.alpha)} {
          padding: ${bs(2)};
        }

        p {
          margin-bottom: 0;
          font-size: inherit;
          line-height: inherit;
        }

        p + p {
          margin-top: ${bs()};
        }
      }

      hr {
        background-color: ${COLORS.teal};
        border: none;
        height: 2px;
        margin-top: ${bs(2)};
        margin-bottom: ${bs(2)};
      }

      iframe[sandbox] {
        margin-top: ${bs(0.5)};
        margin-bottom: ${bs(0.5)};
      }
    `}
  />
)

export default GlobalStyles
