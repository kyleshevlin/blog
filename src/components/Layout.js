import React from 'react'
import PropTypes from 'prop-types'
import Container from './Container'
import Footer from './Footer'
import { FootnoteDisplay } from './Footnotes'
import Header from './Header'
import NewsletterCTA from './NewsletterCTA'
import ValueSell from './ValueSell'
import { bs } from '../shevy'
import AllGlobalStyles from '../styles/AllGlobalStyles'

const Layout = ({ children }) => (
  <>
    <AllGlobalStyles />
    <Header />
    <main
      css={{
        paddingBottom: bs(2),
        minHeight: '65vh'
      }}
      role="main"
    >
      <Container>{children}</Container>
    </main>
    <NewsletterCTA />
    <ValueSell />
    <Footer />
    <FootnoteDisplay />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
