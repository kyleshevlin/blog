import React from 'react'
import { useTheme } from 'emotion-theming'
import { Link } from 'gatsby'
import { lighten } from 'polished'
import { bs } from '../shevy'
import { formatStrForPath } from '../utils'

const linkStyles = theme => {
  const {
    components: { categoriesAndTags }
  } = theme

  return {
    display: 'inline-block',
    backgroundColor: categoriesAndTags.background,
    color: categoriesAndTags.text,
    height: '24px',
    fontFamily: theme.fonts.catamaran,
    fontSize: '0.75rem',
    lineHeight: '24px',
    paddingLeft: bs(0.5),
    paddingRight: bs(0.5),
    marginRight: bs(0.25),
    transition: 'background-color 0.3s ease',

    '&:hover': {
      backgroundColor: lighten(0.1, categoriesAndTags.background),
      color: categoriesAndTags.text
    }
  }
}

const formatItemPath = (item, type) => {
  const paths = {
    category: 'categories',
    tag: 'tags'
  }
  const typePath = paths[type]

  return `${typePath}/${formatStrForPath(item)}`
}

const getTypeHeading = type => {
  const headings = {
    category: 'Categories',
    tag: 'Tags'
  }

  return headings[type]
}

export default function PostCategoriesOrTags({ items, type }) {
  const theme = useTheme()

  return (
    <div css={{ marginBottom: bs() }}>
      <div
        css={{
          fontFamily: theme.fonts.catamaran,
          fontSize: '0.75em',
          lineHeight: 1.8
        }}
      >
        {getTypeHeading(type)}
      </div>
      {items.map(item => (
        <Link css={linkStyles} key={item} to={formatItemPath(item, type)}>
          {item}
        </Link>
      ))}
    </div>
  )
}
