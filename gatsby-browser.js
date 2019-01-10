/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import GlobalStyleWrapper from './src/components/GlobalStyleWrapper'
require('prismjs/themes/prism-tomorrow.css')

export const wrapPageElement = ({ element, props }) => (
  <GlobalStyleWrapper {...props}>{element}</GlobalStyleWrapper>
)
