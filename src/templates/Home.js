import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'
import ExcerptedPost from '../components/ExcerptedPost'
import Pagination from '../components/Pagination'
import shevy, { bs } from '../shevy'

export default function Home({ data, ...props }) {
  const { index, totalPages } = props.pageContext
  const posts = data.allMdx.edges
    .map(edge => edge.node)
    .map(node => ({
      ...node,
      excerpt: `<p>${node.excerpt}</p>`,
    }))

  return (
    <Fragment>
      <Seo title="Home" keywords={['Kyle Shevlin']} />

      <section css={{ marginBottom: bs() }}>
        <p
          css={theme => ({
            fontSize: shevy.h2.fontSize,
            fontFamily: theme.fonts.catamaran,
          })}
        >
          Welcome!
        </p>
        <p>
          My name is Kyle Shevlin. I'm a software engineer and online instructor
          among other things.
        </p>
        <p>
          This is my personal site where I share the content I create. I write
          articles and create courses that break concepts down to their
          fundamentals so anyone can understand them.
        </p>
        <p>
          I encourage you to peruse my blog posts, check out one of my courses
          (or all of them), and sign up for my newsletter if you like what you
          read or see.
        </p>
        <p>
          If you need to reach out to me,{' '}
          <a href="https://twitter.com/kyleshevlin">Twitter</a> is by far the
          best way to do so.
        </p>
        <p>I hope you enjoy your time here and thank you.</p>
      </section>

      <hr />

      <div>
        {posts.map(post => (
          <ExcerptedPost key={post.frontmatter.slug} post={post} />
        ))}
      </div>
      <Pagination {...{ index, totalPages }} />
      <AddedValue />
    </Fragment>
  )
}

export const query = graphql`
  query ExcerptListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            subtitle
            tags
            title
          }
          excerpt(pruneLength: 300)
        }
      }
    }
  }
`
