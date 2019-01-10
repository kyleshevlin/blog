/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React, { Fragment } from 'react'
import Styles from './src/styles'

export const wrapRootElement = ({ element }) => (
  <Fragment>
    <Styles />
    <Fragment>{element}</Fragment>
  </Fragment>
)
