import React from 'react'
import { Link } from 'gatsby'
import { bs } from '../shevy'
import PostDate from './PostDate'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostTags from './PostTags'
import TotalBeardStrokes from './TotalBeardStrokes'

const ExcerptedPost = ({ post }) => {
  const {
    excerpt,
    frontmatter: { date, slug, subtitle, tags, title }
  } = post

  return (
    <div css={{ marginBottom: bs(2) }}>
      <PostDate date={date} />
      <TotalBeardStrokes slug={slug} />
      <div css={{ marginBottom: bs() }}>
        <PostHeader {...{ slug, subtitle, title }} />
      </div>
      <PostContent content={excerpt} />
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
