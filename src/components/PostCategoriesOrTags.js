import React from 'react'
import { Link } from 'gatsby'
import { lighten } from 'polished'
import { COLORS, FONTS } from '../constants'
import { bs } from '../shevy'
import { formatStrForPath } from '../utils'

const linkStyles = {
  display: 'inline-block',
  backgroundColor: COLORS.teal,
  color: COLORS.white,
  height: '24px',
  fontFamily: FONTS.catamaran,
  fontSize: '0.75rem',
  lineHeight: '24px',
  paddingLeft: bs(0.5),
  paddingRight: bs(0.5),
  marginRight: bs(0.25),
  transition: 'background-color 0.3s ease',

  '&:hover': {
    backgroundColor: lighten(0.1, COLORS.teal),
    color: COLORS.white
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

const PostCategoriesOrTags = ({ items, type }) => (
  <div css={{ marginBottom: bs() }}>
    <div
      css={{
        fontFamily: FONTS.catamaran,
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

export default PostCategoriesOrTags
