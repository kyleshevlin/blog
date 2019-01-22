import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import BannerImage from '../components/BannerImage'
import NewsletterCTA from '../components/NewsletterCTA'
import PostAuthor from '../components/PostAuthor'
import PostDate from '../components/PostDate'
import PostHeader from '../components/PostHeader'
import PostContent from '../components/PostContent'
import PostCategoriesOrTags from '../components/PostCategoriesOrTags'
import Seo from '../components/Seo'
import { FONTS } from '../constants'
import { bs } from '../shevy'

const nextOrPreviousWrapStyles = {
  paddingTop: bs(0.25),
  paddingBottom: bs(0.25)
}

const nextOrPreviousHeading = {
  fontFamily: FONTS.catamaran,
  fontWeight: 700
}

const Post = ({ data, pageContext: { nextPost, previousPost } }) => {
  const {
    html,
    frontmatter: {
      categories,
      coverImage,
      date,
      description,
      keywords,
      subtitle,
      tags,
      title
    }
  } = data.markdownRemark

  return (
    <Fragment>
      <Seo title={title} description={description} keywords={keywords || []} />

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
          <div css={nextOrPreviousWrapStyles}>
            <span css={nextOrPreviousHeading}>Previous Post: </span>
            <Link to={previousPost.frontmatter.slug}>
              {previousPost.frontmatter.title}
            </Link>
          </div>
        ) : null}

        {nextPost ? (
          <div css={nextOrPreviousWrapStyles}>
            <span css={nextOrPreviousHeading}>Next Post: </span>
            <Link to={nextPost.frontmatter.slug}>
              {nextPost.frontmatter.title}
            </Link>
          </div>
        ) : null}

        <PostAuthor />
        <NewsletterCTA />
      </div>
    </Fragment>
  )
}

export default Post

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(
      fileAbsolutePath: { regex: "/posts/" }
      frontmatter: { slug: { eq: $slug } }
    ) {
      html
      frontmatter {
        categories
        coverImage {
          childImageSharp {
            original {
              src
            }
          }
        }
        date(formatString: "MMMM DD, YYYY")
        description
        keywords
        subtitle
        tags
        title
      }
    }
  }
`
