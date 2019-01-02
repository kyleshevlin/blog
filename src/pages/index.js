import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  const posts = data.allFile.edges.map(edge => edge.node.childMarkdownRemark)

  return (
    <Layout>
      <SEO title="Home" keywords={['Kyle Shevlin']} />
      <div>
        {posts.map(post => {
          const {
            html,
            frontmatter: { date, slug, subtitle, title }
          } = post

          return (
            <div key={slug}>
              <div>{date}</div>
              <h3>
                <Link to={slug}>{title}</Link>
              </h3>
              {subtitle && <h4>{subtitle}</h4>}
              <div dangerouslySetInnerHTML={{ __html: html }} />
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
    allFile(filter: { sourceInstanceName: { eq: "posts" } }) {
      edges {
        node {
          childMarkdownRemark {
            html
            frontmatter {
              title
              slug
              date
              subtitle
            }
          }
        }
      }
    }
  }
`
