import React from 'react'
import { graphql, Link } from 'gatsby'
import Seo from '../components/Seo'
import Content from '../components/Content'
import Layout from '../components/Layout'
import { useSpacing } from '@kyleshevlin/layout'

const NotFoundPage = ({ data }) => {
  const bs = useSpacing()

  return (
    <Layout>
      <Seo title="404: Not found" />

      <Content>
        <h1>Not Found</h1>

        <p>
          Sorry, you've hit a URL that doesn't exist! That's a bummer. Please
          try a different URL or perhaps choose one of the blog posts listed
          below.
        </p>

        {data.allMdx.edges
          .map(edge => edge.node)
          .map(post => {
            const { slug, title } = post.frontmatter

            return (
              <Link
                css={{
                  display: 'block',
                  marginBottom: bs(0.5),
                }}
                key={slug}
                to={`/${slug}`}
              >
                <span dangerouslySetInnerHTML={{ __html: title }} />
              </Link>
            )
          })}
      </Content>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      limit: 5
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
