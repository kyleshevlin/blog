import React from 'react'
import { graphql, Link } from 'gatsby'
import Seo from '../components/Seo'
import Spacer from '../components/Spacer'
import Content from '../components/Content'

const Tags = ({ data, ...props }) => {
  const posts = data.allMdx.edges.map(edge => edge.node)
  const { tag } = props.pageContext

  return (
    <>
      <Seo title={`${tag} | Tags`} />

      <Content>
        <h1>Tags: {tag}</h1>

        <div>
          {posts.map(post => {
            const { slug, title } = post.frontmatter

            return (
              <Spacer bottom={0.5} key={slug}>
                <Link
                  dangerouslySetInnerHTML={{ __html: title }}
                  to={`/${slug}`}
                />
              </Spacer>
            )
          })}
        </div>
      </Content>
    </>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
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
