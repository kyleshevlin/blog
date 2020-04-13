import React from 'react'
import { Global, css } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { lighten } from 'polished'
import { BREAKPOINTS } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'

export default function Tags() {
  const theme = useTheme()

  return (
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
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
          position: relative;
        }

        a {
          color: ${theme.colors.accent};
          text-decoration: none;
          transition: color 0.3s ease;

          &:hover {
            color: ${lighten(0.1, theme.colors.accent)};
          }
        }

        img {
          max-width: 100%;
          height: auto;
        }

        ul,
        ol {
          list-style-position: outside;
          margin-bottom: ${bs()};
        }

        ul ul,
        ul ol,
        ol ul,
        ol ol {
          margin-left: ${bs()};
          margin-bottom: 0;
        }

        ul li,
        ol li {
          margin-bottom: ${bs(0.5)};
        }

        li ul,
        li ol {
          margin-top: ${bs(0.5)};
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
          background-color: ${theme.colors.offset};
          padding-top: 0;
          padding-bottom: 0;
          padding-left: ${bs(0.25)};
          padding-right: ${bs(0.25)};
          border-radius: 3px;
        }

        blockquote {
          background: ${theme.colors.offset};
          color: ${theme.colors.accent};
          font-family: 'Catamaran', sans-serif;
          font-size: 1.9531rem;
          line-height: 1.2;
          font-weight: 100;
          font-style: italic;
          padding: ${bs(1.5)};
          margin-bottom: ${bs()};
          border-left: 4px solid ${theme.colors.accent};

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
          background-color: ${theme.colors.accent};
          border: none;
          height: 2px;
          margin-top: ${bs(2)};
          margin-bottom: ${bs(2)};
        }

        iframe[sandbox] {
          margin-top: ${bs(0.5)};
          margin-bottom: ${bs(0.5)};
        }

        table {
          border: 2px solid ${theme.colors.offset};
          border-collapse: collapse;
          margin-bottom: ${bs()};
          width: 100%;
        }

        th {
          background-color: ${theme.colors.accent};
          border: 2px solid ${theme.colors.offset};
          color: ${theme.colors.background};
          font-family: ${theme.fonts.catamaran};
          padding: ${bs(0.25)} ${bs(0.5)};
        }

        td {
          border: 2px solid ${theme.colors.offset};
          padding: ${bs(0.25)} ${bs(0.5)};
        }
      `}
    />
  )
}
