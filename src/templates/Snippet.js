import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Seo from '../components/Seo'
import FinishedReading from '../components/FinishedReading'
import TotalBeardStrokes from '../components/TotalBeardStrokes'
import EditLink from '../components/EditLink'
import { bs } from '../shevy'
import Content from '../components/Content'
import PostAuthor from '../components/PostAuthor'

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
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: bs(),
          }}
        >
          <h2 css={{ marginBottom: 0 }}>{name}</h2>
          <EditLink fileAbsolutePath={fileAbsolutePath} />
        </div>
        <TotalBeardStrokes slug={modifySnippetSlugForDB(slug)} />
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
