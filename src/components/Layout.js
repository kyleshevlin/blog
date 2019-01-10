import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { StaticQuery, graphql } from 'gatsby'
import Container from './Container'
import ValueSell from './ValueSell'
import Footer from './Footer'
import Header from './Header'
import { bs } from '../shevy'
import FontFaces from '../styles/FontFaces'
import Reset from '../styles/Reset'
import Tags from '../styles/Tags'
import Tweets from '../styles/Tweets'
import Typography from '../styles/Typography'

const MainWrap = styled.main`
  padding-bottom: ${bs(2)};
  min-height: 65vh;
`

const Styles = () => (
  <Fragment>
    <Reset />
    <FontFaces />
    <Tags />
    <Typography />
    <Tweets />
  </Fragment>
)

const Layout = ({ children }) => (
  <Fragment>
    <Styles />
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              subTitle
            }
          }
        }
      `}
      render={data => {
        const { subTitle, title } = data.site.siteMetadata

        return (
          <Fragment>
            <Header subTitle={subTitle} title={title} />
            <MainWrap role="main">
              <Container>{children}</Container>
            </MainWrap>
            <ValueSell />
            <Footer />
          </Fragment>
        )
      }}
    />
  </Fragment>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
