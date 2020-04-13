import React from 'react'
import Layout from './components/Layout'
import ThemeProvider from './components/ThemeProvider'

const wrapPageElement = ({ element, props }) => {
  return (
    <ThemeProvider>
      <Layout {...props}>{element}</Layout>
    </ThemeProvider>
  )
}

export default wrapPageElement
