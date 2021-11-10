import React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import AddedValue from '../components/AddedValue'
import BannerImage from '../components/BannerImage'
import EditLink from '../components/EditLink'
import PostAuthor from '../components/PostAuthor'
import PostDate from '../components/PostDate'
import PostHeader from '../components/PostHeader'
import PostTags from '../components/PostTags'
import RelatedPosts from '../components/RelatedPosts'
import Seo from '../components/Seo'
import Spacer from '../components/Spacer'
import TotalBeardStrokes from '../components/TotalBeardStrokes'
import { bs } from '../shevy'
import { mq } from '../utils'
import FinishedReading from '../components/FinishedReading'

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
    <>
      <Seo title={title} description={description} keywords={keywords || []} />

      <div
        css={{
          '> h3, > h4, > h5, > h6': {
            marginTop: bs(2),
          },
        }}
      >
        <Spacer bottom={2}>
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: bs(),
            }}
          >
            <PostHeader {...{ subtitle, title }} />
            <EditLink fileAbsolutePath={fileAbsolutePath} />
          </div>

          <MDXRenderer>{file.body}</MDXRenderer>

          <hr />

          <FinishedReading beardStrokeKey={slug} slug={slug} title={title} />

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

          <PostAuthor />
        </Spacer>

        <AddedValue courseNickname={relevantCourseNickname} />
      </div>
    </>
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

function AdditionalPosts({ newerPost, olderPost, relatedPosts }) {
  return relatedPosts && relatedPosts.length ? (
    <RelatedPosts posts={relatedPosts} />
  ) : (
    <div css={{ display: 'grid', gridTemplateColumns: '1fr', gap: bs(0.5) }}>
      {newerPost ? (
        <div>
          <span css={newerOrOlderHeading}>Newer Post: </span>
          <Link
            to={`/${newerPost.frontmatter.slug}`}
            dangerouslySetInnerHTML={{ __html: newerPost.frontmatter.title }}
          />
        </div>
      ) : null}

      {olderPost ? (
        <div>
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
