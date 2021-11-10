import React from 'react'
import Container from './Container'
import Footer from './Footer'
import { FootnoteDisplay } from './Footnotes'
import Header from './Header'
import { bs } from '../shevy'
import AllGlobalStyles from '../styles/AllGlobalStyles'
import Flex from './Flex'

export default function Layout({ children }) {
  return (
    <>
      <AllGlobalStyles />

      <Flex direction="column" style={{ minHeight: '100vh' }}>
        <Header />
        <main
          css={{
            paddingBottom: bs(2),
            flexGrow: 1,
          }}
          role="main"
        >
          <Container>{children}</Container>
        </main>
        <Footer />
      </Flex>
      <FootnoteDisplay />
    </>
  )
}
