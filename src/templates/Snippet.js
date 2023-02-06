import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Seo from '../components/Seo'
import FinishedReading from '../components/FinishedReading'
import TotalBeardStrokes from '../components/TotalBeardStrokes'
import EditLink from '../components/EditLink'
import Content from '../components/Content'
import PostAuthor from '../components/PostAuthor'
import { Flex, Margin } from '@kyleshevlin/layout'
import { TrainingPitch } from '../components/TrainingPitch'

const modifySnippetSlugForDB = slug => `snippets---${slug}`

export default function Snippet({ data }) {
  const snippet = data.mdx
  const { fileAbsolutePath, frontmatter } = snippet
  const { name, slug } = frontmatter

  return (
    <>
      <Seo title={`${name} | Snippets`} />

      <Content>
        <h4 css={{ fontWeight: 700, marginBottom: 0 }}>Snippet</h4>

        <Flex align="baseline" justify="space-between">
          <h2 css={{ marginBottom: 0 }}>{name}</h2>
          <EditLink fileAbsolutePath={fileAbsolutePath} />
        </Flex>

        <Margin top={0.75}>
          <TotalBeardStrokes slug={modifySnippetSlugForDB(slug)} />
        </Margin>

        <div>
          <MDXRenderer>{snippet.body}</MDXRenderer>
        </div>

        <hr />

        <FinishedReading
          beardStrokeKey={modifySnippetSlugForDB(slug)}
          slug={`snippets/${slug}`}
          title={name}
        />

        <hr />

        <Margin vertical={2}>
          <TrainingPitch />
        </Margin>

        <PostAuthor />
      </Content>
    </>
  )
}

export const pageQuery = graphql`
  query Snippet($slug: String) {
    mdx(
      fileAbsolutePath: { regex: "/snippets/" }
      frontmatter: { slug: { eq: $slug } }
    ) {
      body
      fileAbsolutePath
      frontmatter {
        name
        slug
      }
    }
  }
`
