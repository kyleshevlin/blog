import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import Seo from '../components/Seo'
import { bs } from '../shevy'
import { formatStrForPath } from '../utils'

const linkStyles = css`
  display: block;
  margin-bottom: ${bs(0.5)};
`

const AllCategoriesOrTags = ({ pageContext }) => {
  const { categories, tags } = pageContext

  // Has to be one or the other
  const title = tags ? 'All Tags' : 'All Categories'
  const itemType = tags ? 'tags' : 'categories'
  const items = tags ? tags : categories

  return (
    <Fragment>
      <Seo title={title} />

      <h1>{title}</h1>
      <div>
        {items.map(item => (
          <Link
            key={item}
            css={linkStyles}
            to={`${itemType}/${formatStrForPath(item)}`}
          >
            {item}
          </Link>
        ))}
      </div>
    </Fragment>
  )
}

export default AllCategoriesOrTags
