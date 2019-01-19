import React from 'react'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { COLORS, FONTS } from '../constants'
import { bs } from '../shevy'

const LINKS = [
  { to: '/', title: 'Home' },
  { to: '/about', title: 'About' },
  { to: '/portfolio', title: 'Portfolio' },
  { to: '/podcast', title: 'Podcast' },
  { href: 'https://kyleshevlin.github.io', title: 'Resume' },
  { to: '/contact', title: 'Contact' }
]

const linkStyles = {
  display: 'inline-block',
  fontFamily: FONTS.catamaran,
  color: COLORS.black,
  padding: bs(0.5)
}

const Nav = () => (
  <nav css={{ marginLeft: bs(-0.5) }}>
    {LINKS.map(link => {
      const { href, to, title } = link

      switch (true) {
        case Boolean(href):
          return (
            <OutboundLink
              css={linkStyles}
              key={title}
              href={href}
              title={title}
            >
              {title}
            </OutboundLink>
          )

        case Boolean(to):
          return (
            <Link
              key={title}
              css={linkStyles}
              activeStyle={{ color: COLORS.teal }}
              title={title}
              to={to}
            >
              {title}
            </Link>
          )

        default:
          return null
      }
    })}
  </nav>
)

export default Nav
