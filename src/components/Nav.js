import React from 'react'
import { Link } from 'gatsby'
import { bs } from '../shevy'
import { v } from '../utils'

const LINKS = [
  { to: '/', title: 'Home' },
  { to: '/about', title: 'About' },
  { to: '/collections', title: 'Collections' },
  { to: '/courses', title: 'Courses' },
  { to: '/podcast', title: 'Podcast' },
  { to: '/contact', title: 'Contact' },
]

const linkStyles = () => ({
  display: 'inline-block',
  fontFamily: v('fonts-catamaran'),
  color: v('colors-text'),
  padding: bs(0.5),
})

export default function Nav() {
  return (
    <nav css={{ marginLeft: bs(-0.5) }}>
      {LINKS.map(link => {
        const { to, title } = link

        return (
          <Link
            key={title}
            css={linkStyles()}
            activeStyle={{ color: v('colors-accent') }}
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
