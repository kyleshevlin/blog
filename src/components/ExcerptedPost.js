import React from 'react'
import { Link } from 'gatsby'
import { bs } from '../shevy'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostTags from './PostTags'
import TotalBeardStrokes from './TotalBeardStrokes'

const ExcerptedPost = ({ post }) => {
  const {
    excerpt: mdxExcerpt,
    frontmatter: { excerpt: frontmatterExcerpt, slug, subtitle, tags, title },
  } = post
  const excerpt = frontmatterExcerpt || mdxExcerpt
  const formattedExcerpt = formatExcerpt(excerpt)

  return (
    <div css={{ marginBottom: bs(2) }}>
      <div css={{ marginBottom: bs() }}>
        <PostHeader {...{ slug, subtitle, title }} />
      </div>
      <TotalBeardStrokes slug={slug} />
      <PostContent content={formattedExcerpt} />
      <div css={{ marginBottom: bs() }}>
        <Link to={slug}>Read More</Link>
      </div>

      {tags && (
        <div css={{ marginBottom: bs() }}>
          <PostTags items={tags} />
        </div>
      )}
    </div>
  )
}

export default ExcerptedPost

function formatExcerpt(excerpt) {
  if (/^<p>/.test(excerpt)) return excerpt

  return `<p>${excerpt}</p>`
}
