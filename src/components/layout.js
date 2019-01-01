import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Fragment>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div>
          {children}
          <footer>
            &copy;{new Date().getFullYear()} Kyle Shevlin. Built with{' '}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </Fragment>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
