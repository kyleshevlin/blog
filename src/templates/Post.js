import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import BannerImage from '../components/BannerImage'
import PostAuthor from '../components/PostAuthor'
import PostDate from '../components/PostDate'
import PostHeader from '../components/PostHeader'
import PostContent from '../components/PostContent'
import PostCategoriesOrTags from '../components/PostCategoriesOrTags'
import Seo from '../components/Seo'
import { bs } from '../shevy'

const NextOrPreviousWrap = styled.div`
  padding-top: ${bs(0.25)};
  padding-bottom: ${bs(0.25)};
`

const Bold = styled.span`
  font-family: 'Catamaran', sans-serif;
  font-weight: 700;
`

const Post = ({ data, pageContext: { nextPost, previousPost } }) => {
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

        {previousPost ? (
          <NextOrPreviousWrap>
            <Bold>Previous Post: </Bold>
            <Link to={previousPost.frontmatter.slug}>
              {previousPost.frontmatter.title}
            </Link>
          </NextOrPreviousWrap>
        ) : null}

        {nextPost ? (
          <NextOrPreviousWrap>
            <Bold>Next Post: </Bold>
            <Link to={nextPost.frontmatter.slug}>
              {nextPost.frontmatter.title}
            </Link>
          </NextOrPreviousWrap>
        ) : null}

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
