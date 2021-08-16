import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import AddedValue from '../components/AddedValue'
import BannerImage from '../components/BannerImage'
import PostAuthor from '../components/PostAuthor'
import PostDate from '../components/PostDate'
import PostHeader from '../components/PostHeader'
import PostTags from '../components/PostTags'
import RelatedPosts from '../components/RelatedPosts'
import Seo from '../components/Seo'
import TotalBeardStrokes from '../components/TotalBeardStrokes'
import { bs } from '../shevy'
import { mq } from '../utils'
import FinishedReading from '../components/FinishedReading'

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
          '> h3, > h4, > h5, > h6': {
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

        <hr />

        <FinishedReading slug={slug} title={title} />

        <hr />

        <div
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: bs(),

            [mq.bravo]: {
              gridTemplateColumns: '1fr 1fr',
            },
          }}
        >
          <div>
            <AdditionalPosts
              newerPost={newerPost}
              olderPost={olderPost}
              relatedPosts={relatedPosts}
            />
          </div>
          {tags && (
            <div>
              <PostTags items={tags} />
            </div>
          )}
        </div>

        <hr />

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
    <div>
      {newerPost ? (
        <div css={newerOrOlderPostWrap}>
          <span css={newerOrOlderHeading}>Newer Post: </span>
          <Link
            to={`/${newerPost.frontmatter.slug}`}
            dangerouslySetInnerHTML={{ __html: newerPost.frontmatter.title }}
          />
        </div>
      ) : null}

      {olderPost ? (
        <div css={newerOrOlderPostWrap}>
          <span css={newerOrOlderHeading}>Older Post: </span>
          <Link
            to={`/${olderPost.frontmatter.slug}`}
            dangerouslySetInnerHTML={{ __html: olderPost.frontmatter.title }}
          />
        </div>
      ) : null}
    </div>
  )
}
