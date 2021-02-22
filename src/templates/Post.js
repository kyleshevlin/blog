import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import AddedValue from '../components/AddedValue'
import BannerImage from '../components/BannerImage'
import BeardStrokes from '../components/BeardStrokes'
import PostAuthor from '../components/PostAuthor'
import PostDate from '../components/PostDate'
import PostHeader from '../components/PostHeader'
import PostTags from '../components/PostTags'
import RelatedPosts from '../components/RelatedPosts'
import Seo from '../components/Seo'
import Share from '../components/Share'
import TotalBeardStrokes from '../components/TotalBeardStrokes'
import { bs } from '../shevy'
import { BREAKPOINTS } from '../constants'
import { createMediaQuery } from '../utils'

const newerOrOlderPostWrap = {
  paddingTop: bs(0.25),
  paddingBottom: bs(0.25),
}

const newerOrOlderHeading = {
  fontFamily: 'var(--fonts-catamaran)',
  fontWeight: 700,
}

const Post = ({
  data,
  pageContext: { olderPost, newerPost, relatedPosts },
}) => {
  const file = data.mdx
  const {
    fileAbsolutePath,
    frontmatter: {
      coverImage,
      date,
      description,
      keywords,
      relevantCourseNickname,
      slug,
      subtitle,
      tags,
      title,
    },
  } = file

  return (
    <Fragment>
      <Seo title={title} description={description} keywords={keywords || []} />

      <div
        css={{
          '> h3': {
            marginTop: bs(2),
          },
        }}
      >
        {coverImage && (
          <BannerImage
            src={coverImage.childImageSharp.original.src}
            alt={`${title} Banner`}
          />
        )}
        <PostDate date={date} />
        <TotalBeardStrokes slug={slug} />
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: '3fr 1fr',
            alignItems: 'end',
            marginBottom: bs(),
          }}
        >
          <PostHeader {...{ subtitle, title }} />
          <EditLink fileAbsolutePath={fileAbsolutePath} />
        </div>
        <MDXRenderer>{file.body}</MDXRenderer>

        <Share slug={slug} title={title} />

        <div
          css={{
            [createMediaQuery(BREAKPOINTS.alpha)]: {
              alignItems: 'center',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              marginBottom: bs(2),
            },

            [createMediaQuery(BREAKPOINTS.bravo)]: {
              gridTemplateColumns: '2fr 3fr',
            },

            [createMediaQuery(BREAKPOINTS.charlie)]: {
              gridTemplateColumns: '1fr 2fr',
            },
          }}
        >
          <div css={{ marginRight: bs(1.5), marginBottom: bs() }}>
            <BeardStrokes slug={slug} />
          </div>
          {tags && (
            <div css={{ flexGrow: 0, marginBottom: bs() }}>
              <PostTags items={tags} />
            </div>
          )}
        </div>

        <AdditionalPosts
          newerPost={newerPost}
          olderPost={olderPost}
          relatedPosts={relatedPosts}
        />

        <AddedValue courseNickname={relevantCourseNickname} />

        <PostAuthor />
      </div>
    </Fragment>
  )
}

export default Post

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(
      fileAbsolutePath: { regex: "/posts/" }
      frontmatter: { slug: { eq: $slug } }
    ) {
      body
      fileAbsolutePath
      frontmatter {
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
        relevantCourseNickname
        slug
        subtitle
        tags
        title
      }
    }
  }
`

const generateEditLink = fileAbsolutePath => {
  const [, filePath] = fileAbsolutePath.split('src')
  return `https://github.com/kyleshevlin/blog/edit/main/src${filePath}`
}

function EditLink({ fileAbsolutePath }) {
  return (
    <div css={{ textAlign: 'right' }}>
      <a
        css={{
          display: 'inline-block',
          fontFamily: 'var(--fonts-catamaran)',
          fontStyle: 'italic',
          paddingLeft: bs(0.5),
          paddingRight: bs(0.5),
        }}
        href={generateEditLink(fileAbsolutePath)}
      >
        edit <EditSVG fill="var(--colors-accent)" width={18} />
      </a>
    </div>
  )
}

function EditSVG({ fill = '#000', width }) {
  return (
    <svg
      width={width}
      viewBox="0 0 31 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.5 23H0L4 14L25 0L30.5 8.5L9.5 23Z" fill={fill} />
    </svg>
  )
}

function AdditionalPosts({ newerPost, olderPost, relatedPosts }) {
  return relatedPosts && relatedPosts.length ? (
    <RelatedPosts posts={relatedPosts} />
  ) : (
    <div css={{ marginTop: bs(2) }}>
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
    </div>
  )
}
