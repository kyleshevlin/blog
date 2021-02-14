import React, { Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'
import Tag from '../components/icons/Tag'
import { bs } from '../shevy'
import { getNodes, v } from '../utils'

const AllPosts = ({ data }) => {
  const allPosts = getNodes(data.allPosts)

  return (
    <Fragment>
      <Seo title="All Posts" keywords={['All Posts', 'Kyle Shevlin']} />

      <h1>All Posts</h1>

      <p>
        Here is a list of the title, subtitle, and tags of all my posts. Use a
        good old fashioned find right now to search for keywords. I'm working on
        adding search and filters soon.
      </p>

      <div>
        {allPosts.map(post => {
          const { slug, subtitle, tags, title } = post.frontmatter

          return (
            <Link
              css={{
                display: 'block',
                padding: bs(0.75),
                marginLeft: bs(-0.75),
                marginRight: bs(-0.75),
                '&:hover': { backgroundColor: v('colors-offset') },
              }}
              key={slug}
              to={slug}
            >
              <h3 css={{ marginBottom: 0 }}>{title}</h3>
              {subtitle && (
                <h5 css={{ fontWeight: 'bold', marginBottom: 0 }}>
                  {subtitle}
                </h5>
              )}
              {tags && tags.length ? (
                <div
                  css={{
                    display: 'flex',
                    gap: bs(0.5),
                    alignItems: 'center',
                    marginTop: bs(0.25),
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
                    <Tag fill={v('colors-offsetMore')} />
                  </div>
                  {tags.map(tag => (
                    <div
                      css={{
                        color: v('colors-text'),
                        fontFamily: v('fonts-catamaran'),
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
      </div>

      <AddedValue />
    </Fragment>
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
