import React from 'react'
import { Global, css } from '@emotion/core'
import { BREAKPOINTS } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'

export default function Tags() {
  return (
    <Global
      styles={css`
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        html {
          box-sizing: border-box;
          font-family: 'Droid Serif', serif;
          font-size: 85%;
          line-height: 1.6;

          ${createMediaQuery(BREAKPOINTS.alpha)} {
            font-size: 100%;
          }

          ${createMediaQuery(BREAKPOINTS.delta)} {
            font-size: 115%;
          }
        }

        body {
          min-height: 100vh;
          background-color: var(--colors-background);
          color: var(--colors-text);
          position: relative;
        }

        a {
          color: var(--colors-accent);
          text-decoration: none;
          transition: color 0.3s ease;

          &:hover {
            color: var(--colors-accentLight);
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
          margin: 0;
          margin-top: ${bs(1.5)};
          margin-bottom: ${bs(1.5)};
          padding: ${bs(0.5)};
        }

        pre code {
          background: transparent;
        }

        code {
          display: inline-block;
          background-color: var(--colors-offset);
          padding-top: 0;
          padding-bottom: 0;
          padding-left: ${bs(0.25)};
          padding-right: ${bs(0.25)};
          border-radius: 3px;
        }

        code[class*='language-'],
        pre[class*='language-'] {
          display: block;
        }

        blockquote {
          background: var(--colors-offset);
          color: var(--colors-accent);
          font-family: 'Catamaran', sans-serif;
          font-size: 1.9531rem;
          line-height: 1.2;
          font-weight: 100;
          font-style: italic;
          padding: ${bs(1.5)};
          margin-bottom: ${bs()};
          border-left: 4px solid var(--colors-accent);

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
          background-color: var(--colors-accent);
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
          border: 4px solid var(--colors-offset);
          border-collapse: collapse;
          margin-bottom: ${bs()};
          width: 100%;
        }

        th {
          background-color: var(--colors-accent);
          border: 4px solid var(--colors-offset);
          color: var(--colors-background);
          font-family: var(--fonts-catamaran);
          font-weight: bold;
          padding: ${bs(0.25)} ${bs(0.5)};
        }

        td {
          border: 2px solid var(--colors-offset);
          padding: ${bs(0.25)} ${bs(0.5)};
        }
      `}
    />
  )
}
