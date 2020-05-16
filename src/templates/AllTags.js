import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import Seo from '../components/Seo'
import { bs } from '../shevy'
import { formatStrForPath } from '../utils'
import AddedValue from '../components/AddedValue'

const linkStyles = css`
  display: block;
  margin-bottom: ${bs(0.5)};
`

const AllTags = ({ pageContext }) => {
  const { tags } = pageContext
  const title = 'All Tags'

  return (
    <Fragment>
      <Seo title={title} />

      <h1>{title}</h1>
      <div>
        {tags.map(item => (
          <Link
            key={item}
            css={linkStyles}
            to={`tags/${formatStrForPath(item)}`}
          >
            {item}
          </Link>
        ))}
      </div>
      <AddedValue />
    </Fragment>
  )
}

export default AllTags
