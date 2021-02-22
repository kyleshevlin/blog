import React from 'react'
import { Link } from 'gatsby'
import { bs } from '../shevy'

const LINKS = [
  { to: '/', title: 'Home' },
  { to: '/all-posts', title: 'All Posts' },
  { to: '/collections', title: 'Collections' },
  { to: '/courses', title: 'Courses' },
  { to: '/about', title: 'About' },
]

const linkStyles = () => ({
  display: 'inline-block',
  fontFamily: 'var(--fonts-catamaran)',
  color: 'var(--colors-text)',
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
            activeStyle={{ color: 'var(--colors-accent)' }}
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
