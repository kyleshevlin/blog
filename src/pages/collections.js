import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'

const Collections = ({ data }) => {
  const collections = data.allCollectionsJson.edges.map(edge => edge.node)

  return (
    <Fragment>
      <Seo title="Collections" keywords={['Collections', 'Kyle Shevlin']} />

      <h1>Collections</h1>

      <p>
        Check out some collections! Each one is a topic and a related set of
        posts I hand pick and maintain.
      </p>

      <div>
        {collections.map(collection => (
          <Collection key={collection.name} collection={collection} />
        ))}
      </div>

      <AddedValue />
    </Fragment>
  )
}

export default Collections

export const query = graphql`
  query AllCollections {
    allCollectionsJson(sort: { fields: order, order: ASC }) {
      edges {
        node {
          name
          slugs
          posts {
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  }
`

function Collection({ collection }) {
  const { name, posts, slugs } = collection
  const postsBySlug = posts.reduce((acc, cur) => {
    acc[cur.frontmatter.slug] = cur.frontmatter
    return acc
  }, {})
  const zippedPosts = slugs.map(slug => postsBySlug[slug])

  return (
    <div>
      <h2 id={name.replace(' ', '-').toLowerCase()}>{name}</h2>
      {zippedPosts.length ? (
        <ul css={{ listStyle: 'none' }}>
          {zippedPosts.map(post => (
            <li key={post.slug}>
              <a href={`/${post.slug}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <div>This curation has no posts</div>
      )}
    </div>
  )
}
