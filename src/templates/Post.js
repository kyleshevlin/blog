import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostDate from '../components/PostDate'
import PostHeader from '../components/PostHeader'
import PostContent from '../components/PostContent'
import PostCategoriesOrTags from '../components/PostCategoriesOrTags'

const Post = ({ data }) => {
  const {
    html,
    frontmatter: { categories, date, subtitle, tags, title }
  } = data.markdownRemark

  return (
    <Layout>
      <div>
        <PostDate date={date} />
        <PostHeader {...{ subtitle, title }} />
        <PostContent content={html} />

        {categories && (
          <PostCategoriesOrTags items={categories} type="category" />
        )}

        {tags && <PostCategoriesOrTags items={tags} type="tag" />}
      </div>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
        categories
        tags
      }
    }
  }
`
