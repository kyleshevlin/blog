import { Flex } from '@kyleshevlin/layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { LayoutRaw } from '../components/LayoutRaw'
import Seo from '../components/Seo'
import { stripElementTags } from '../utils'

export default function RawPost({ data }) {
  const file = data.mdx
  const {
    body,
    frontmatter: { date, subtitle, title },
  } = file

  return (
    <LayoutRaw>
      <Seo title={`${stripElementTags(title)} | Raw`} />

      <Flex direction="column" gap={1}>
        <div>{date}</div>

        <Flex direction="column" gap={0.25}>
          <h2 style={{ marginBottom: 0 }}>{title}</h2>
          {subtitle && <span style={{ fontWeight: 'bold' }}>{subtitle}</span>}
        </Flex>

        <div>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </Flex>
    </LayoutRaw>
  )
}

export const pageQuery = graphql`
  query ($slug: String!) {
    mdx(
      fileAbsolutePath: { regex: "/posts/raw/" }
      frontmatter: { slug: { eq: $slug } }
    ) {
      body
      fileAbsolutePath
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        subtitle
        title
      }
    }
  }
`
