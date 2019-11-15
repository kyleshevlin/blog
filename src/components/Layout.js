import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Container from './Container'
import Footer from './Footer'
import { FootnotesContainer, FootnoteDisplay } from './Footnotes'
import Header from './Header'
import NewsletterCTA from './NewsletterCTA'
import ValueSell from './ValueSell'
import FontFaces from '../styles/FontFaces'
import Miscellaneous from '../styles/Miscellaneous'
import Reset from '../styles/Reset'
import Tags from '../styles/Tags'
import Tweets from '../styles/Tweets'
import Typography from '../styles/Typography'
import { bs } from '../shevy'

const Layout = ({ children }) => (
  <Fragment>
    <Reset />
    <FontFaces />
    <Tags />
    <Typography />
    <Tweets />
    <Miscellaneous />

    <FootnotesContainer>
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
    </FootnotesContainer>
  </Fragment>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
