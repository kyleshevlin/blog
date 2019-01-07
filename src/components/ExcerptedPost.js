import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { bs } from '../shevy'
import PostDate from './PostDate'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostCategoriesOrTags from './PostCategoriesOrTags'

const Wrap = styled.div`
  margin-bottom: ${bs(2)};
`

const ReadMoreWrap = styled.div`
  margin-bottom: ${bs()};
`

const ExcerptedPost = ({ post }) => {
  const {
    excerpt,
    frontmatter: { categories, date, slug, subtitle, tags, title }
  } = post

  return (
    <Wrap>
      <PostDate date={date} />
      <PostHeader {...{ slug, subtitle, title }} />
      <PostContent content={excerpt} />
      <ReadMoreWrap>
        <Link to={slug}>Read More</Link>
      </ReadMoreWrap>

      {categories && (
        <PostCategoriesOrTags items={categories} type="category" />
      )}

      {tags && <PostCategoriesOrTags items={tags} type="tag" />}
    </Wrap>
  )
}

export default ExcerptedPost
