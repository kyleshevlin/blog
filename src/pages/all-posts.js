import React from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'
import Tag from '../components/icons/Tag'
import { bs } from '../shevy'
import { getNodes } from '../utils'
import Spacer from '../components/Spacer'

const AllPosts = ({ data }) => {
  const allPosts = getNodes(data.allPosts)

  return (
    <>
      <Seo title="All Posts" keywords={['All Posts', 'Kyle Shevlin']} />

      <h1>All Posts</h1>

      <p>
        Here is a list of the title, subtitle, and tags of all my posts. Use a
        good old fashioned "find" in your browser (cmd+f or ctrl+f) right now to
        search for keywords. I'm working on adding search and filters soon.
      </p>

      <Spacer bottom={2}>
        {allPosts.map(post => {
          const { slug, subtitle, tags, title } = post.frontmatter

          return (
            <Link
              css={{
                display: 'block',
                padding: bs(0.75),
                marginLeft: bs(-0.75),
                marginRight: bs(-0.75),
                '&:hover': { backgroundColor: 'var(--colors-offset)' },
              }}
              key={slug}
              to={`/${slug}`}
            >
              <h3
                css={{ marginBottom: 0 }}
                dangerouslySetInnerHTML={{ __html: title }}
              />
              {subtitle && (
                <h5
                  css={{ fontWeight: 'bold', marginBottom: 0 }}
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                />
              )}
              {tags && tags.length ? (
                <div
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: bs(0.25),
                    marginBottom: bs(-0.25),

                    '> div': {
                      marginRight: bs(0.5),
                      marginBottom: bs(0.25),
                    },
                  }}
                >
                  <div
                    css={{
                      '> svg': {
                        display: 'block',
                        position: 'relative',
                        top: 1,
                      },
                    }}
                  >
                    <Tag fill={'var(--colors-offsetMore)'} />
                  </div>
                  {tags.map(tag => (
                    <div
                      css={{
                        color: 'var(--colors-text)',
                        fontFamily: 'var(--fonts-catamaran)',
                        fontSize: '.85rem',
                      }}
                      key={tag}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              ) : null}
            </Link>
          )
        })}
      </Spacer>

      <AddedValue />
    </>
  )
}

export default AllPosts

export const query = graphql`
  query AllPosts {
    allPosts: allMdx(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            slug
            subtitle
            tags
            title
          }
        }
      }
    }
  }
`
