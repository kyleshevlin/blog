import React from 'react'
import { css } from '@emotion/core'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { bs } from '../shevy'

const linkStyles = css`
  display: block;
  margin-bottom: ${bs(0.5)};
`
const Tags = ({ data, ...props }) => {
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)

  return (
    <Layout>
      <h1>{props.pageContext.tag}</h1>

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

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        frontmatter: { tags: { in: [$tag] } }
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
