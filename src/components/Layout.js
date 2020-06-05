import React from 'react'
import Container from './Container'
import Footer from './Footer'
import { FootnoteDisplay } from './Footnotes'
import Header from './Header'
import { bs } from '../shevy'
import AllGlobalStyles from '../styles/AllGlobalStyles'
import AnnouncementBanner from './AnnouncementBanner'

export default function Layout({ children }) {
  return (
    <>
      <AllGlobalStyles />
      <AnnouncementBanner />
      <Header />
      <main
        css={{
          paddingBottom: bs(2),
          minHeight: '65vh',
        }}
        role="main"
      >
        <Container>{children}</Container>
      </main>
      <Footer />
      <FootnoteDisplay />
    </>
  )
}
