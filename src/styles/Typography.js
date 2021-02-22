import React from 'react'
import { Global, css } from '@emotion/core'
import shevy from '../shevy'

export default function Typography() {
  return (
    <Global
      styles={css`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: var(--fonts-catamaran);
          font-weight: 400;
          text-rendering: optimizeLegibility;
        }

        h1 {
          ${shevy.h1}
        }

        h2 {
          ${shevy.h2}
        }

        h3 {
          ${shevy.h3}
        }

        h4 {
          ${shevy.h4}
        }

        h5 {
          ${shevy.h5}
        }

        h6 {
          ${shevy.h6}
        }

        p {
          ${shevy.content}
        }
      `}
    />
  )
}
