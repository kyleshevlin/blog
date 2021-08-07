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
import shevy, { bs } from '../shevy'
import { mq } from '../utils'
import Spacer from '../components/Spacer'
import LinkButton from '../components/LinkButton'
import KofiLogo from '../components/KofiLogo'

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

        <Spacer bottom={2}>
          <div>
            <h3 css={{ fontWeight: 'bold', marginBottom: bs(0.25) }}>
              Finished reading?
            </h3>
            <p>Here are a few options for what to do next.</p>
            <AfterOptionWrap>
              <AfterOption label="Like">
                <BeardStrokes slug={slug} />
              </AfterOption>
              <AfterOption label="Share">
                <Share slug={slug} title={title} />
              </AfterOption>
              <AfterOption label="Support">
                <Kofi />
              </AfterOption>
            </AfterOptionWrap>
          </div>
        </Spacer>

        <div
          css={{
            marginBottom: bs(2),

            [mq.bravo]: {
              display: 'grid',
              gap: bs(),
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

function AfterOptionWrap({ children }) {
  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: bs(),
      }}
    >
      {children}
    </div>
  )
}

function AfterOption({ children, label }) {
  return (
    <>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'var(--fonts-catamaran)',
          fontSize: shevy.h4.fontSize,
          fontWeight: 'bold',
        }}
      >
        {label}
      </div>
      <div css={{ display: 'flex', alignItems: 'center' }}>{children}</div>
    </>
  )
}

function Kofi() {
  return (
    <LinkButton
      href="https://ko-fi.com/kyleshevlin"
      overrideStyles={{ width: '100%' }}
    >
      <div css={{ display: 'inline-block' }}>
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <Spacer vert={0.25} right={0.5}>
            <KofiLogo width={40} />
          </Spacer>
          <span css={{ fontSize: shevy.h4.fontSize }}>Buy me a Kofi</span>
        </div>
      </div>
    </LinkButton>
  )
}
