import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { bs } from '../shevy'
import Button from './Button'
import Container from './Container'
import Nav from './Nav'
import { useTheme } from './ThemeProvider'
import { BREAKPOINTS } from '../constants'
import { createMediaQuery, v } from '../utils'

export default function Header() {
  return (
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
              marginBottom: bs(),
            }}
          >
            <Container>
              <div
                css={{
                  display: 'flex',
                  flexDirection: 'column',

                  [createMediaQuery(BREAKPOINTS.alpha)]: {
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                }}
              >
                <Link
                  css={{
                    color: v('colors-text'),
                    display: 'block',
                  }}
                  to="/"
                >
                  <h1
                    css={{
                      lineHeight: 1,
                      marginBottom: 0,
                    }}
                  >
                    {title}
                  </h1>
                  <div
                    css={{
                      fontFamily: v('fonts-catamaran'),
                      fontSize: '1rem',
                      marginBottom: 0,
                    }}
                  >
                    {subTitle}
                  </div>
                </Link>
                <div
                  css={{
                    marginTop: bs(0.5),
                    marginBottom: bs(0.5),

                    [createMediaQuery(BREAKPOINTS.alpha)]: {
                      marginTop: 0,
                      marginLeft: 'auto',
                    },
                  }}
                >
                  <ThemeRotator />
                </div>
              </div>
              <Nav />
            </Container>
          </header>
        )
      }}
    />
  )
}

function ThemeRotator() {
  const { rotateTheme } = useTheme()
  return <Button onClick={rotateTheme}>Change Theme</Button>
}
