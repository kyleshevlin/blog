import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'
import ExcerptedPost from '../components/ExcerptedPost'
import Pagination from '../components/Pagination'

const ExcerptList = ({ data, ...props }) => {
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

export default ExcerptList

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
