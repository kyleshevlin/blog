import React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import BannerImage from '../components/BannerImage'
import EditLink from '../components/EditLink'
import PostAuthor from '../components/PostAuthor'
import PostDate from '../components/PostDate'
import PostHeader from '../components/PostHeader'
import PostTags from '../components/PostTags'
import RelatedPosts from '../components/RelatedPosts'
import Seo from '../components/Seo'
import TotalBeardStrokes from '../components/TotalBeardStrokes'
import { mq, stripElementTags } from '../utils'
import FinishedReading from '../components/FinishedReading'
import Content from '../components/Content'
import { Flex, FlexItem, Margin, useSpacing } from '@kyleshevlin/layout'
import Layout from '../components/Layout'

const Post = ({
  data,
  pageContext: { olderPost, newerPost, relatedPosts },
}) => {
  const bs = useSpacing()

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
    <Layout>
      <Seo
        title={stripElementTags(title)}
        description={description}
        keywords={keywords || []}
      />

      <Content courseNickname={relevantCourseNickname}>
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

          <Margin bottom={1}>
            <Flex align="flex-end" gap={1} justify="space-between">
              <FlexItem grow={1} shrink={1}>
                <PostHeader {...{ subtitle, title }} />
              </FlexItem>
              <EditLink fileAbsolutePath={fileAbsolutePath} />
            </Flex>
          </Margin>

          <MDXRenderer>{file.body}</MDXRenderer>

          <hr />

          <FinishedReading beardStrokeKey={slug} />

          <Margin vertical={2}>
            <div
              css={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: bs(1),

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
          </Margin>

          <hr />

          <PostAuthor />
        </div>
      </Content>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query ($slug: String!) {
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
  const bs = useSpacing()

  if (relatedPosts?.length) {
    return <RelatedPosts posts={relatedPosts} />
  }

  return (
    <div css={{ display: 'grid', gridTemplateColumns: '1fr', gap: bs(0.5) }}>
      {newerPost && (
        <AdditionalPost
          heading="Newer Post"
          slug={`/${newerPost.frontmatter.slug}`}
          title={newerPost.frontmatter.title}
        />
      )}

      {olderPost && (
        <AdditionalPost
          heading="Older Post"
          slug={`/${olderPost.frontmatter.slug}`}
          title={olderPost.frontmatter.title}
        />
      )}
    </div>
  )
}

function AdditionalPost({ heading, slug, title }) {
  return (
    <div>
      <span
        css={{
          fontFamily: 'var(--fonts-secondary)',
          fontWeight: 700,
        }}
      >
        {heading}
      </span>
      {': '}
      <Link to={slug} dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  )
}
