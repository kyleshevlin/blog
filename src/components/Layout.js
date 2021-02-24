import React from 'react'
import Footer from './Footer'
import { FootnoteDisplay } from './Footnotes'
import Header from './Header'
import AllGlobalStyles from '../styles/AllGlobalStyles'

export default function Layout({ children }) {
  return (
    <>
      <AllGlobalStyles />
      <Header />

      {children}

      <Footer />
      <FootnoteDisplay />
    </>
  )
}
