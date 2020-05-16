import React from 'react'
import Layout from './components/Layout'
import { FootnotesProvider } from './components/Footnotes'
import ThemeProvider from './components/ThemeProvider'

const wrapPageElement = ({ element, props }) => {
  return (
    <ThemeProvider>
      <FootnotesProvider>
        <Layout {...props}>{element}</Layout>
      </FootnotesProvider>
    </ThemeProvider>
  )
}

export default wrapPageElement
