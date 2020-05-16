import React from 'react'
import { useTheme } from 'emotion-theming'
import { Link } from 'gatsby'
import { lighten } from 'polished'
import { bs } from '../shevy'
import { formatStrForPath } from '../utils'

const linkStyles = theme => {
  const {
    components: { tags }
  } = theme

  return {
    display: 'inline-block',
    backgroundColor: tags.background,
    color: tags.text,
    height: '24px',
    fontFamily: theme.fonts.catamaran,
    fontSize: '0.75rem',
    lineHeight: '24px',
    paddingLeft: bs(0.5),
    paddingRight: bs(0.5),
    marginRight: bs(0.25),
    marginBottom: bs(0.25),
    transition: 'background-color 0.3s ease',

    '&:hover': {
      backgroundColor: lighten(0.1, tags.background),
      color: tags.text
    }
  }
}

const formatItemPath = item => {
  return `tags/${formatStrForPath(item)}`
}

export default function PostTags({ items }) {
  const theme = useTheme()

  return (
    <div>
      <div
        css={{
          fontFamily: theme.fonts.catamaran,
          fontSize: '0.75em',
          lineHeight: 1.8
        }}
      >
        Tags
      </div>
      {items.map(item => (
        <Link css={linkStyles} key={item} to={formatItemPath(item)}>
          {item}
        </Link>
      ))}
    </div>
  )
}
