import React from 'react'
import { Link } from 'gatsby'
import { bs } from '../shevy'
import PostDate from './PostDate'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostCategoriesOrTags from './PostCategoriesOrTags'
import TotalBeardStrokes from './TotalBeardStrokes'

const ExcerptedPost = ({ post }) => {
  const {
    excerpt,
    frontmatter: { categories, date, slug, subtitle, tags, title }
  } = post

  return (
    <div css={{ marginBottom: bs(2) }}>
      <PostDate date={date} />
      <TotalBeardStrokes slug={slug} />
      <PostHeader {...{ slug, subtitle, title }} />
      <PostContent content={excerpt} />
      <div css={{ marginBottom: bs() }}>
        <Link to={slug}>Read More</Link>
      </div>

      {categories && (
        <PostCategoriesOrTags items={categories} type="category" />
      )}

      {tags && <PostCategoriesOrTags items={tags} type="tag" />}
    </div>
  )
}

export default ExcerptedPost
