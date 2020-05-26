import React from 'react'
import { graphql } from 'gatsby'
import AddedValue from '../components/AddedValue'
import ExcerptList from '../components/ExcerptList'
import Pagination from '../components/Pagination'
import Seo from '../components/Seo'
import { getNodes } from '../utils'

export default function AdditionalPages({ data, ...props }) {
  const { index, totalPages } = props.pageContext
  const posts = getNodes(data.allMdx)

  return (
    <>
      <Seo title={`Page ${index + 1}`} keywords={['Kyle Shevlin']} />
      <ExcerptList posts={posts} />
      <Pagination {...{ index, totalPages }} />
      <AddedValue />
    </>
  )
}

export const query = graphql`
  query AdditionalPagesQuery($skip: Int!, $limit: Int!) {
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
  }
`
