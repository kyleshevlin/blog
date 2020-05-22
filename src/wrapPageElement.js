import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { FootnoteMarker as Marker } from './components/Footnotes'
import Layout from './components/Layout'
import CoursesProvider from './components/CoursesProvider'
import { FootnotesProvider } from './components/Footnotes'
import ThemeProvider from './components/ThemeProvider'

const shortcodes = { Marker }

const wrapPageElement = ({ element, props }) => {
  return (
    <ThemeProvider>
      <MDXProvider components={shortcodes}>
        <CoursesProvider>
          <FootnotesProvider>
            <Layout {...props}>{element}</Layout>
          </FootnotesProvider>
        </CoursesProvider>
      </MDXProvider>
    </ThemeProvider>
  )
}

export default wrapPageElement
