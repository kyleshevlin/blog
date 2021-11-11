import React from 'react'
import Container from './Container'
import Footer from './Footer'
import { FootnoteDisplay } from './Footnotes'
import Header from './Header'
import AllGlobalStyles from '../styles/AllGlobalStyles'
import Flex from './Flex'
import Spacer from './Spacer'

export default function Layout({ children }) {
  return (
    <>
      <AllGlobalStyles />

      <Flex direction="column" style={{ minHeight: '100vh' }}>
        <Header />

        <main css={{ flexGrow: 1 }}>
          <Container>{children}</Container>
        </main>

        <Spacer top={2}>
          <Footer />
        </Spacer>
      </Flex>
      <FootnoteDisplay />
    </>
  )
}
