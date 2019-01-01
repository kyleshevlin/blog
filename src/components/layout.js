import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { StaticQuery, graphql } from 'gatsby'
import Container from './Container'
import Footer from './Footer'
import Header from './header'
import './layout.css'
import { bs } from '../shevy'

const MainWrap = styled.main`
  padding-top: ${bs(2)};
  padding-bottom: ${bs(2)};
`

const Layout = ({ children }) => (
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
          <Footer />
        </Fragment>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
