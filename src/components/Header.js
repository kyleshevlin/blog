import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { bs } from '../shevy'
import Button from './Button'
import Container from './Container'
import Nav from './Nav'
import { useTheme } from './ThemeProvider'
import { mq } from '../utils'
import ShiftBy from './ShiftBy'
import Moon from './icons/Moon'
import Sun from './icons/Sun'

const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        subTitle
      }
    }
  }
`

export default function Header() {
  const data = useStaticQuery(query)
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

            [mq.alpha]: {
              flexDirection: 'row',
              alignItems: 'center',
            },
          }}
        >
          <Link
            css={{
              color: 'var(--colors-text)',
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
                fontFamily: 'var(--fonts-catamaran)',
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

              [mq.alpha]: {
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
}

const ICON_FOR_CURRENT_THEME = {
  light: Moon,
  dark: Sun,
}

function ThemeRotator() {
  const { rotateTheme, theme } = useTheme()
  const Icon = ICON_FOR_CURRENT_THEME[theme]

  return (
    <Button
      aria-label="Toggle theme"
      onClick={rotateTheme}
      title="Toggle theme"
    >
      <ShiftBy y={1}>
        <Icon size={14} />
      </ShiftBy>
    </Button>
  )
}
