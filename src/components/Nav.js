import React from 'react'
import { Link } from 'gatsby'
import { COLORS, FONTS } from '../constants'
import { bs } from '../shevy'

const LINKS = [
  { to: '/', title: 'Home' },
  { to: '/about', title: 'About' },
  { to: '/portfolio', title: 'Portfolio' },
  { to: '/courses', title: 'Courses' },
  { to: '/podcast', title: 'Podcast' },
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
      const { to, title } = link

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
    })}
  </nav>
)

export default Nav
