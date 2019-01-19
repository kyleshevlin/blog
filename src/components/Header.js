import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { COLORS, FONTS } from '../constants'
import { bs } from '../shevy'
import Container from './Container'
import Nav from './Nav'

const Header = ({ subTitle, title }) => (
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
        <header
          css={{
            paddingTop: bs(),
            paddingBottom: bs(),
            marginBottom: bs()
          }}
        >
          <Container>
            <Link
              css={{
                color: COLORS.black,
                display: 'block'
              }}
              to="/"
            >
              <h1
                css={{
                  lineHeight: 1,
                  marginBottom: 0
                }}
              >
                {title}
              </h1>
              <div
                css={{
                  fontFamily: FONTS.catamaran,
                  fontSize: '1rem',
                  marginBottom: 0
                }}
              >
                {subTitle}
              </div>
            </Link>
            <Nav />
          </Container>
        </header>
      )
    }}
  />
)

export default Header
