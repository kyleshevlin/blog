import React from 'react'
import { graphql, Link } from 'gatsby'
import { Margin } from '@kyleshevlin/layout'
import Seo from '../components/Seo'
import Content from '../components/Content'
import Layout from '../components/Layout'

const Tags = ({ data, ...props }) => {
  const posts = data.allMdx.edges.map(edge => edge.node)
  const { tag } = props.pageContext

  return (
    <Layout>
      <Seo title={`${tag} | Tags`} />

      <Content>
        <h1>Tags: {tag}</h1>

        <div>
          {posts.map(post => {
            const { slug, title } = post.frontmatter

            return (
              <Margin bottom={0.5} key={slug}>
                <Link
                  dangerouslySetInnerHTML={{ __html: title }}
                  to={`/${slug}`}
                />
              </Margin>
            )
          })}
        </div>
      </Content>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query ($tag: String) {
    allMdx(
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
