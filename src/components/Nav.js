import React from 'react'
import { Link } from 'gatsby'
import { useSpacing } from '@kyleshevlin/layout'

const LINKS = [
  { to: '/', title: 'Home' },
  { to: '/all-posts', title: 'All Posts' },
  { to: '/tags', title: 'Tags' },
  { to: '/courses', title: 'Courses' },
  { to: '/snippets', title: 'Snippets' },
  { to: '/about', title: 'About' },
]

const getLinkStyles = spacing => ({
  display: 'inline-block',
  fontFamily: 'var(--fonts-secondary)',
  color: 'var(--colors-text)',
  padding: spacing(0.5),
})

export default function Nav() {
  const bs = useSpacing()
  const linkStyles = React.useMemo(() => getLinkStyles(bs), [bs])

  return (
    <nav css={{ marginLeft: bs(-0.5) }}>
      {LINKS.map(link => {
        const { to, title } = link

        return (
          <Link
            key={title}
            css={linkStyles}
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
