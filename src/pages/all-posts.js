import React, { Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'
import Button from '../components/Button'
import Tag from '../components/icons/Tag'
import shevy, { bs } from '../shevy'
import { BREAKPOINTS } from '../constants'
import { createMediaQuery, getNodes, v } from '../utils'

const AllPosts = ({ data }) => {
  const allPosts = getNodes(data.allPosts)
  const [{ filters, posts, tags }, { remove, add }] = useFilteredPosts(allPosts)

  return (
    <Fragment>
      <Seo title="All Posts" keywords={['All Posts', 'Kyle Shevlin']} />

      <h1>All Posts</h1>

      <p>
        Here is a list of the title, subtitle, and tags of all my posts. Use a
        good old fashioned find right now to search for keywords. I'm working on
        adding search and filters soon.
      </p>

      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          marginBottom: bs(),
          '> button': { marginRight: bs(0.25), marginBottom: bs(0.25) },
        }}
      >
        {tags.map(tag => {
          const active = filters.has(tag)
          return (
            <Button
              style={{
                backgroundColor: active
                  ? v('colors-accent')
                  : v('colors-offsetMore'),
                '&:hover': {
                  backgroundColor: active
                    ? v('colors-accent')
                    : v('colors-offsetMore'),
                },
              }}
              key={tag}
              onClick={() => {
                active ? remove(tag) : add(tag)
              }}
            >
              {tag}
            </Button>
          )
        })}
      </div>

      <div>
        <div css={{ marginBottom: bs(0.5) }}>{posts.length} posts</div>
        <div
          css={{
            [createMediaQuery(BREAKPOINTS.bravo)]: {
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridGap: bs(0.5),
            },
          }}
        >
          {posts.map(post => {
            const { slug, subtitle, tags, title } = post.frontmatter

            return (
              <Link
                css={{
                  display: 'block',
                  backgroundColor: v('colors-offset'),
                  padding: `${bs(0.5)} ${bs(0.75)}`,
                  borderBottom: '4px solid',
                  borderBottomColor: v('colors-offset'),
                  transition: 'border-color .2s ease',

                  '&:hover': {
                    borderBottomColor: `var(--colors-accent)`,
                  },
                }}
                key={slug}
                to={slug}
              >
                <h4 css={{ marginBottom: 0 }}>{title}</h4>
                {subtitle && (
                  <h5
                    css={{
                      fontWeight: 'bold',
                      lineHeight: shevy.baseLineHeight * 0.85,
                      marginBottom: 0,
                    }}
                  >
                    {subtitle}
                  </h5>
                )}
                {tags && tags.length ? (
                  <div
                    css={{
                      display: 'flex',
                      flexWrap: 'wrap',
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

function getPostsByTag(posts) {
  const map = {}

  posts.forEach(post => {
    const { tags } = post.frontmatter

    if (tags) {
      tags.forEach(tag => {
        if (!map[tag]) {
          map[tag] = new Set()
        }

        map[tag].add(post)
      })
    }
  })

  return map
}

function intersection(a, b) {
  const result = new Set()

  for (const item of b) {
    if (a.has(item)) {
      result.add(item)
    }
  }

  return result
}

function useFilteredPosts(posts) {
  const [filters, setFilters] = React.useState(new Set())

  const handlers = React.useMemo(
    () => ({
      add: item => {
        setFilters(f => {
          const nextFilters = new Set(f)
          nextFilters.add(item)
          return nextFilters
        })
      },
      remove: item => {
        setFilters(f => {
          const nextFilters = new Set(f)
          nextFilters.delete(item)
          return nextFilters
        })
      },
    }),
    []
  )

  const postsByTag = React.useMemo(() => getPostsByTag(posts), [posts])

  let filteredPosts = posts

  if (filters.size) {
    let intersectingPosts = new Set(posts)
    for (const filter of filters) {
      intersectingPosts = intersection(intersectingPosts, postsByTag[filter])
    }

    filteredPosts = Array.from(intersectingPosts)
  }

  return [
    { filters, posts: filteredPosts, tags: Object.keys(postsByTag) },
    handlers,
  ]
}
