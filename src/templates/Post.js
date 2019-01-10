import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import BannerImage from '../components/BannerImage'
import PostAuthor from '../components/PostAuthor'
import PostDate from '../components/PostDate'
import PostHeader from '../components/PostHeader'
import PostContent from '../components/PostContent'
import PostCategoriesOrTags from '../components/PostCategoriesOrTags'
import Seo from '../components/Seo'

const Post = ({ data }) => {
  const {
    html,
    frontmatter: { categories, coverImage, date, subtitle, tags, title }
  } = data.markdownRemark

  return (
    <Fragment>
      <Seo title={title} />

      <div>
        {coverImage && (
          <BannerImage
            src={coverImage.childImageSharp.original.src}
            alt={`${title} Banner`}
          />
        )}
        <PostDate date={date} />
        <PostHeader {...{ subtitle, title }} />
        <PostContent content={html} />

        {categories && (
          <PostCategoriesOrTags items={categories} type="category" />
        )}

        {tags && <PostCategoriesOrTags items={tags} type="tag" />}

        <PostAuthor />
      </div>
    </Fragment>
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
        coverImage {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
    }
  }
`
