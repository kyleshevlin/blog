import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import AddedValue from '../components/AddedValue'
import { buttonStyles } from '../components/Button'
import ExcerptList from '../components/ExcerptList'
import Pagination from '../components/Pagination'
import Seo from '../components/Seo'
import shevy, { bs } from '../shevy'
import { getNodes, v } from '../utils'

export default function Home({ data, ...props }) {
  const { index, totalPages } = props.pageContext
  const collections = getNodes(data.allCollectionsJson)
  const recentPosts = getNodes(data.recent).map(node => ({
    ...node,
    excerpt: `<p>${node.excerpt}</p>`,
  }))

  return (
    <Fragment>
      <Seo title="Home" keywords={['Kyle Shevlin']} />
      <Welcome />
      <Collections collections={collections} />
      <hr />
      <ExcerptList posts={recentPosts} />
      <Pagination {...{ index, totalPages }} />
      <AddedValue />
    </Fragment>
  )
}

export const query = graphql`
  query HomeQuery($skip: Int!, $limit: Int!) {
    allCollectionsJson(sort: { fields: [order], order: ASC }) {
      edges {
        node {
          name
        }
      }
    }

    recent: allMdx(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            excerpt
            slug
            subtitle
            tags
            title
          }
          excerpt(pruneLength: 300)
        }
      }
    }

    all: allMdx(filter: { fileAbsolutePath: { regex: "/posts/" } }) {
      edges {
        node {
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`

function Welcome() {
  return (
    <section css={{ marginBottom: bs(2) }}>
      <p
        css={{
          fontSize: shevy.h2.fontSize,
          fontFamily: v('fonts-catamaran'),
        }}
      >
        Welcome!
      </p>
      <p>
        My name is Kyle Shevlin. I'm a software engineer, online instructor, and
        information curator among other things.
      </p>
      <p>
        This is my personal site where I share the content I create. I write
        articles and create courses that break concepts down to their
        fundamentals so anyone can understand them.
      </p>
      <p>
        I encourage you to peruse my blog posts, check out one of my courses (or
        all of them), and sign up for my newsletter if you like what you read or
        see.
      </p>
      <p>
        If you need to reach out to me,{' '}
        <a href="https://twitter.com/kyleshevlin">Twitter</a> is by far the best
        way to do so.
      </p>
      <p>I hope you enjoy your time here and thank you.</p>
    </section>
  )
}

function Collections({ collections }) {
  return (
    <section>
      <h3>Unsure Where to Start?</h3>
      <p>Try a post in one of these curated collections.</p>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: bs(),
        }}
      >
        {collections.map(collection => (
          <CollectionItem key={collection.name} collection={collection} />
        ))}
      </div>
    </section>
  )
}

function CollectionItem({ collection }) {
  const { name } = collection

  return (
    <Link
      css={{
        ...buttonStyles,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: v('fonts-catamaran'),
        fontSize: shevy.h4.fontSize,
        padding: bs(),
      }}
      to={`/collections#${name.replace(' ', '-').toLowerCase()}`}
    >
      <span>{name}</span>
    </Link>
  )
}
