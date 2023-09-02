import { graphql, Link } from 'gatsby'
import React from 'react'
import { Flex } from '@kyleshevlin/layout'
import Seo from '../components/Seo'
import { LayoutRaw } from '../components/LayoutRaw'

export default function Raw({ data }) {
  const posts = data.rawPosts.edges.map(edge => edge.node)

  return (
    <LayoutRaw>
      <Seo title="Raw" keywords={['Kyle Shevlin', 'raw', 'unedited']} />

      <h2>Raw</h2>

      <ul css={{ paddingLeft: 0 }}>
        <Flex direction="column" gap={1.5}>
          {posts.map(post => {
            const { slug, subtitle, title } = post.frontmatter

            return (
              <li key={slug}>
                <Link to={`/raw/${slug}`}>
                  <Flex direction="column" gap={0.25}>
                    <h3 style={{ margin: 0 }}>{title}</h3>
                    {subtitle && <span>{subtitle}</span>}
                  </Flex>
                </Link>
              </li>
            )
          })}
        </Flex>
      </ul>
    </LayoutRaw>
  )
}

export const query = graphql`
  query RawQuery {
    rawPosts: allMdx(
      filter: { fileAbsolutePath: { regex: "/posts/raw/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            subtitle
            title
          }
        }
      }
    }
  }
`
