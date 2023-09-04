import React from 'react'
import { Link } from 'gatsby'
import { getButtonStyles } from './Button'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostTags from './PostTags'
import TotalBeardStrokes from './TotalBeardStrokes'
import { mq } from '../utils'
import { useSpacing } from '@kyleshevlin/layout'

const ExcerptedPost = ({ post }) => {
  const {
    excerpt: mdxExcerpt,
    frontmatter: { excerpt: frontmatterExcerpt, slug, subtitle, tags, title },
  } = post
  const excerpt = frontmatterExcerpt || mdxExcerpt
  const formattedExcerpt = formatExcerpt(excerpt)

  const bs = useSpacing()
  const linkStyles = React.useMemo(() => getButtonStyles(bs), [bs])

  return (
    <article css={{ marginBottom: bs(2) }}>
      <div css={{ marginBottom: bs(1) }}>
        <PostHeader {...{ slug, subtitle, title }} />
      </div>
      <TotalBeardStrokes slug={slug} />
      <PostContent content={formattedExcerpt} />
      <div
        css={{
          display: 'grid',
          gridGap: bs(1),
          [mq.bravo]: {
            alignItems: 'start',
            gridTemplateColumns: 'max-content 1fr',
          },
        }}
      >
        <div>
          <Link css={linkStyles} to={`/${slug}`}>
            Read More
          </Link>
        </div>

        {tags && (
          <div>
            <PostTags items={tags} />
          </div>
        )}
      </div>
    </article>
  )
}

export default ExcerptedPost

function formatExcerpt(excerpt) {
  if (/^<p>/.test(excerpt)) return excerpt

  return `<p>${excerpt}</p>`
}
