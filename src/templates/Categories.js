import React from 'react'
import { css } from '@emotion/core'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { bs } from '../shevy'

const linkStyles = css`
  display: block;
  margin-bottom: ${bs(0.5)};
`
const Categories = ({ data, ...props }) => {
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)
  const { category } = props.pageContext

  return (
    <Layout>
      <Seo title={`${category} | Categories`} />

      <h1>{category}</h1>

      <div>
        {posts.map(post => {
          const { slug, title } = post.frontmatter

          return (
            <Link key={slug} css={linkStyles} to={slug}>
              {title}
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export default Categories

export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        frontmatter: { categories: { in: [$category] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`
