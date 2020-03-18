import React from 'react'
import { useTheme } from 'emotion-theming'
import { graphql, Link, StaticQuery } from 'gatsby'
import { lighten } from 'polished'
import { bs } from '../shevy'
import Container from './Container'
import Nav from './Nav'
import Search from './Search'
import { BREAKPOINTS } from '../constants'
import { createMediaQuery } from '../utils'

export default function Header() {
  const theme = useTheme()

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
              marginBottom: bs()
            }}
          >
            <Container>
              <div
                css={{
                  display: 'flex',
                  flexDirection: 'column',

                  [createMediaQuery(BREAKPOINTS.alpha)]: {
                    flexDirection: 'row',
                    alignItems: 'center'
                  }
                }}
              >
                <Link
                  css={{
                    color: theme.colors.text,
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
                      fontFamily: theme.fonts.catamaran,
                      fontSize: '1rem',
                      marginBottom: 0
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
                      marginLeft: 'auto'
                    }
                  }}
                >
                  <ThemeToggle />
                  <Search />
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

const buttonStyles = theme => {
  const {
    components: { themeToggle }
  } = theme

  return {
    display: 'inline-block',
    backgroundColor: themeToggle.background,
    color: themeToggle.text,
    fontFamily: theme.fonts.catamaran,
    fontSize: '0.75rem',
    paddingLeft: bs(0.5),
    paddingRight: bs(0.5),
    border: 'none',
    borderRadius: '2px',
    marginRight: bs(0.5),
    transition: 'background-color 0.3s ease',

    '&:hover': {
      backgroundColor: lighten(0.1, themeToggle.background),
      color: themeToggle.text
    }
  }
}

function ThemeToggle() {
  const theme = useTheme()

  return (
    <button css={buttonStyles} onClick={theme.toggleTheme}>
      Toggle Theme
    </button>
  )
}
