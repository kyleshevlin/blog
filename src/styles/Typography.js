import React from 'react'
import { Global, css } from '@emotion/core'
import shevy from '../shevy'

const Typography = () => (
  <Global
    styles={css`
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: 'Catamaran', sans-serif;
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

export default Typography
