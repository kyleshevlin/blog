import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Portfolio = ({ data }) => {
  const items = data.allMarkdownRemark.edges.map(edge => edge.node)

  return (
    <Layout>
      <SEO title="Portfolio" keywords={['Portfolio', 'Kyle Shevlin']} />
      <h1>Portfolio</h1>

      <p>
        I approach projects and talks like a craftsperson. I enjoy the process
        of architecting a project, improving it wherever possible, and take a
        lot of pride in my work.
      </p>

      <p>
        Below are a few of the sites, talks, and tools I have crafted. Click on
        the image to read more about the project.
      </p>

      <div>
        {items.map(item => {
          const {
            frontmatter: { slug, squareImage, title }
          } = item

          return (
            <div key={slug}>
              <Link to={`portfolio/${slug}`}>
                <img src={squareImage.publicURL} alt={title} />
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Portfolio

export const query = graphql`
  query PortfolioItemsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/portfolio/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            squareImage {
              publicURL
            }
          }
        }
      }
    }
  }
`
