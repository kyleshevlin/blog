import React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import BannerImage from '../components/BannerImage'
import EditLink from '../components/EditLink'
import LinkButton from '../components/LinkButton'
import PostAuthor from '../components/PostAuthor'
import PostDate from '../components/PostDate'
import PostHeader from '../components/PostHeader'
import PostTags from '../components/PostTags'
import RelatedPosts from '../components/RelatedPosts'
import Seo from '../components/Seo'
import TotalBeardStrokes from '../components/TotalBeardStrokes'
import shevy, { bs } from '../shevy'
import { mq, stripElementTags } from '../utils'
import FinishedReading from '../components/FinishedReading'
import Content from '../components/Content'
import { Flex, Margin } from '@kyleshevlin/layout'

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

          <Margin vertical={3}>
            <TrainingPitch />
          </Margin>

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
        </div>
      </Content>
    </>
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
  return relatedPosts && relatedPosts.length ? (
    <RelatedPosts posts={relatedPosts} />
  ) : (
    <div css={{ display: 'grid', gridTemplateColumns: '1fr', gap: bs(0.5) }}>
      {newerPost ? (
        <AdditionalPost
          heading="Newer Post"
          slug={`/${newerPost.frontmatter.slug}`}
          title={newerPost.frontmatter.title}
        />
      ) : null}

      {olderPost ? (
        <AdditionalPost
          heading="Older Post"
          slug={`/${olderPost.frontmatter.slug}`}
          title={olderPost.frontmatter.title}
        />
      ) : null}
    </div>
  )
}

function AdditionalPost({ heading, slug, title }) {
  return (
    <div>
      <span
        css={{
          fontFamily: 'var(--fonts-catamaran)',
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

function TrainingPitch() {
  return (
    <div
      css={{
        backgroundColor: 'var(--components-newsletterCTA-background)',
        color: 'var(--components-newsletterCTA-text)',
        fontFamily: 'var(--fonts-catamaran)',
        padding: bs(2),
      }}
    >
      <Flex direction="column" gap={1}>
        <div
          css={{
            fontSize: shevy.h2.fontSize,
            lineHeight: shevy.h2.lineHeight,
          }}
        >
          Are you, or the company you work for, struggling with something
          mentioned in this&nbsp;article?
        </div>

        <div
          css={{ fontSize: shevy.h4.fontSize, lineHeight: shevy.h4.lineHeight }}
        >
          Would you benefit from a live training session?
        </div>

        <div>
          <LinkButton
            variant="bigWide"
            overrideStyles={{
              backgroundColor:
                'var(--components-newsletterCTA-submitButton-background)',
              color: 'var(--components-newsletterCTA-submitButton-text)',

              '&:hover': {
                backgroundColor:
                  'var(--components-newsletterCTA-submitButton-hover-background)',
                color:
                  'var(--components-newsletterCTA-submitButton-hover-text)',
              },
            }}
            href="mailto:kyle@kyleshevlin.com"
          >
            Let's Talk
          </LinkButton>
        </div>
      </Flex>
    </div>
  )
}
