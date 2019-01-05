import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ExcerptedPost from '../components/ExcerptedPost'

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)

  return (
    <Layout>
      <SEO title="Home" keywords={['Kyle Shevlin']} />
      <div>
        {posts.map(post => (
          <ExcerptedPost key={post.frontmatter.slug} post={post} />
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomePageQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            subtitle
            slug
            date(formatString: "MMMM DD, YYYY")
            categories
            tags
          }
          excerpt(pruneLength: 300, format: HTML)
        }
      }
    }
  }
`
