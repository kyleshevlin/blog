import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)

  return (
    <Layout>
      <SEO title="Home" keywords={['Kyle Shevlin']} />
      <div>
        {posts.map(post => {
          const {
            excerpt,
            frontmatter: { categories, date, slug, subtitle, tags, title }
          } = post

          return (
            <div key={slug} style={{ marginBottom: 50 }}>
              <div>{date}</div>
              <h3>
                <Link to={slug}>{title}</Link>
              </h3>
              {subtitle && <h4>{subtitle}</h4>}
              <div dangerouslySetInnerHTML={{ __html: excerpt }} />
              {categories && (
                <div>
                  <div>Categories:</div>
                  {categories.map(cat => (
                    <span key={cat}>{cat} </span>
                  ))}
                </div>
              )}
              {tags && (
                <div>
                  <div>Tags:</div>
                  {tags.map(tag => (
                    <span key={tag}>{tag} </span>
                  ))}
                </div>
              )}
            </div>
          )
        })}
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
