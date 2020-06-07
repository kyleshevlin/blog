import React from 'react'
import Layout from './components/Layout'
import CoursesProvider from './components/CoursesProvider'
import { FootnotesProvider } from './components/Footnotes'
import { ThemeProvider } from './components/ThemeProvider'

const wrapPageElement = ({ element, props }) => {
  return (
    <ThemeProvider>
      <CoursesProvider>
        <FootnotesProvider>
          <Layout {...props}>{element}</Layout>
        </FootnotesProvider>
      </CoursesProvider>
    </ThemeProvider>
  )
}

export default wrapPageElement
