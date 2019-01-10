/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import GlobalStyleWrapper from './src/components/GlobalStyleWrapper'

export const wrapPageElement = ({ element, props }) => (
  <GlobalStyleWrapper {...props}>{element}</GlobalStyleWrapper>
)
