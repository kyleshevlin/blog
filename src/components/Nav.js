import React from 'react'
import { useTheme } from 'emotion-theming'
import { Link } from 'gatsby'
import { bs } from '../shevy'

const LINKS = [
  { to: '/', title: 'Home' },
  { to: '/about', title: 'About' },
  { to: '/courses', title: 'Courses' },
  { to: '/podcast', title: 'Podcast' },
  { to: '/contact', title: 'Contact' },
]

const linkStyles = theme => ({
  display: 'inline-block',
  fontFamily: theme.fonts.catamaran,
  color: theme.colors.text,
  padding: bs(0.5),
})

export default function Nav() {
  const theme = useTheme()

  return (
    <nav css={{ marginLeft: bs(-0.5) }}>
      {LINKS.map(link => {
        const { to, title } = link

        return (
          <Link
            key={title}
            css={linkStyles(theme)}
            activeStyle={{ color: theme.colors.accent }}
            title={title}
            to={to}
          >
            {title}
          </Link>
        )
      })}
    </nav>
  )
}
