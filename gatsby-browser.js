/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import Layout from './src/components/Layout'
require('prismjs/themes/prism-tomorrow.css')

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)
