import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import BannerImage from '../components/BannerImage'
import NewsletterCTA from '../components/NewsletterCTA'
import PostAuthor from '../components/PostAuthor'
import PostDate from '../components/PostDate'
import PostHeader from '../components/PostHeader'
import PostContent from '../components/PostContent'
import PostCategoriesOrTags from '../components/PostCategoriesOrTags'
import RelatedPosts from '../components/RelatedPosts'
import Seo from '../components/Seo'
import { FONTS } from '../constants'
import { bs } from '../shevy'

const newerOrOlderPostWrap = {
  paddingTop: bs(0.25),
  paddingBottom: bs(0.25)
}

const newerOrOlderHeading = {
  fontFamily: FONTS.catamaran,
  fontWeight: 700
}

const Post = ({
  data,
  pageContext: { olderPost, newerPost, relatedPosts }
}) => {
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

        {relatedPosts ? <RelatedPosts posts={relatedPosts} /> : null}

        {categories && (
          <PostCategoriesOrTags items={categories} type="category" />
        )}

        {tags && <PostCategoriesOrTags items={tags} type="tag" />}

        {newerPost ? (
          <div css={newerOrOlderPostWrap}>
            <span css={newerOrOlderHeading}>Newer Post: </span>
            <Link to={newerPost.frontmatter.slug}>
              {newerPost.frontmatter.title}
            </Link>
          </div>
        ) : null}

        {olderPost ? (
          <div css={newerOrOlderPostWrap}>
            <span css={newerOrOlderHeading}>Older Post: </span>
            <Link to={olderPost.frontmatter.slug}>
              {olderPost.frontmatter.title}
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
