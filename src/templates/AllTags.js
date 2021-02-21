import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import Seo from '../components/Seo'
import { bs } from '../shevy'
import { formatStrForPath, inflect } from '../utils'
import AddedValue from '../components/AddedValue'

const linkStyles = css`
  display: inline-block;
  margin-bottom: ${bs(0.5)};
`

export default function AllTags({ pageContext }) {
  const { counts, tags } = pageContext
  const title = 'All Tags'

  const sortedData = React.useMemo(() => {
    return sortByCount(
      tags.map(tag => ({
        tag,
        count: counts[tag],
      }))
    )
  }, [counts, tags])

  return (
    <Fragment>
      <Seo title={title} />

      <h1>{title}</h1>

      <div>
        {sortedData.map(({ tag, count }) => (
          <div key={tag}>
            <Link css={linkStyles} to={`tags/${formatStrForPath(tag)}`}>
              {tag}
            </Link>
            <span>
              {' '}
              - {count} {inflect('post', 'posts', count)}
            </span>
          </div>
        ))}
      </div>

      <AddedValue />
    </Fragment>
  )
}

const sortByCount = arr => {
  const clone = [...arr]

  return clone.sort((a, b) => {
    if (a.count < b.count) return 1
    if (a.count > b.count) return -1
    return 0
  })
}
