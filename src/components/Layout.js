import React from 'react'
import { Flex, Margin } from '@kyleshevlin/layout'
import Container from './Container'
import Footer from './Footer'
import { FootnoteDisplay } from './Footnotes'
import Header from './Header'
import AllGlobalStyles from '../styles/AllGlobalStyles'

export default function Layout({ children }) {
  return (
    <>
      <AllGlobalStyles />

      <Flex direction="column" style={{ minHeight: '100vh' }}>
        <Header />

        <div css={{ flexGrow: 1 }}>
          <Container>{children}</Container>
        </div>

        <Margin top={2}>
          <Footer />
        </Margin>
      </Flex>

      <FootnoteDisplay />
    </>
  )
}
