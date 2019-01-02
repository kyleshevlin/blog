import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Portfolio = ({ data }) => {
  const items = data.allFile.edges.map(edge => edge.node.childMarkdownRemark)

  return (
    <Layout>
      <SEO title="Portfolio" keywords={['Portfolio', 'Kyle Shevlin']} />
      <h1>Portfolio</h1>
      {items.map(item => {
        const {
          html,
          frontmatter: { slug, title }
        } = item

        return (
          <div key={slug}>
            <h3>{title}</h3>
          </div>
        )
      })}
    </Layout>
  )
}

export default Portfolio

export const query = graphql`
  query PortfolioItemsQuery {
    allFile(filter: { sourceInstanceName: { eq: "portfolio" } }) {
      edges {
        node {
          childMarkdownRemark {
            html
            frontmatter {
              title
              slug
              subtitle
            }
          }
        }
      }
    }
  }
`
