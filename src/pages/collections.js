import React from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'
import Container from '../components/Container'
import Main from '../components/Main'

const Collections = ({ data }) => {
  const collections = data.allCollectionsJson.edges.map(edge => edge.node)

  return (
    <Container>
      <Main>
        <Seo title="Collections" keywords={['Collections', 'Kyle Shevlin']} />

        <h1>Collections</h1>

        <p>
          In an effort to help readers find good articles to start reading on my
          blog, I have created these collections. Each collection is a topic
          I've covered in detail and they contain a list of posts that I
          handpicked for each one. Check them out.
        </p>

        <div>
          {collections.map(collection => (
            <Collection key={collection.name} collection={collection} />
          ))}
        </div>

        <AddedValue />
      </Main>
    </Container>
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
              <Link to={post.slug}>{post.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>This curation has no posts</div>
      )}
    </div>
  )
}
