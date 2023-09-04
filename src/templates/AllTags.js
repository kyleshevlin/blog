import React from 'react'
import { Link } from 'gatsby'
import Seo from '../components/Seo'
import { formatStrForPath, inflect } from '../utils'
import Content from '../components/Content'
import Layout from '../components/Layout'
import { useSpacing } from '@kyleshevlin/layout'

export default function AllTags({ pageContext }) {
  const bs = useSpacing()
  const { counts, tags } = pageContext
  const title = 'Tags'

  const sortedData = React.useMemo(() => {
    return sortByCount(
      tags.map(tag => ({
        tag,
        count: counts[tag],
      }))
    )
  }, [counts, tags])

  return (
    <Layout>
      <Seo title={title} />

      <Content>
        <h1>{title}</h1>

        <p>
          I categorize each of my blog posts with tags. I hope this helps you
          find interesting articles to read related to ones you have already
          enjoyed or would like to explore next.
        </p>

        <div>
          {sortedData.map(({ tag, count }) => (
            <div css={{ marginBottom: bs(0.5) }} key={tag}>
              <Link
                css={{ display: 'inline-block' }}
                to={`/tags/${formatStrForPath(tag)}`}
              >
                {tag}
              </Link>
              <span>
                {' '}
                - {count} {inflect('post')(count)}
              </span>
            </div>
          ))}
        </div>
      </Content>
    </Layout>
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
