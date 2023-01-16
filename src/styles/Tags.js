import React from 'react'
import { Global, css } from '@emotion/core'
import shevy, { bs } from '../shevy'
import { mq } from '../utils'

export default function Tags() {
  return (
    <Global
      styles={css`
        :root {
          --fonts-primary: 'Droid Serif', serif;
          --fonts-secondary: 'Catamaran', sans-serif;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        html {
          box-sizing: border-box;
          font-family: var(--fonts-primary);
          font-size: 85%;
          line-height: ${shevy.baseLineHeight};

          ${mq.alpha} {
            font-size: 100%;
          }

          ${mq.delta} {
            font-size: 115%;
          }
        }

        body {
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
          padding: 0;
        }

        code {
          display: inline-block;
          background-color: var(--tags-code);
          line-height: 1.5;
          padding-top: 0;
          padding-bottom: 0;
          padding-left: ${bs(0.125)};
          padding-right: ${bs(0.125)};
          border-radius: 2px;
        }

        code[class*='language-'],
        pre[class*='language-'] {
          display: block;
        }

        blockquote {
          background: var(--colors-offset);
          color: var(--colors-accent);
          font-family: var(--fonts-secondary);
          font-size: 1.9531rem;
          line-height: 1.2;
          font-weight: 100;
          font-style: italic;
          padding: ${bs(1.5)};
          margin-bottom: ${bs()};
          border-left: 4px solid var(--colors-accent);

          ${mq.alpha} {
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
          background-color: var(--colors-offset);
          border: 4px solid var(--colors-offset);
          color: var(--colors-text);
          font-family: var(--fonts-secondary);
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
