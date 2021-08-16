import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'
import Spacer from '../components/Spacer'
import FinishedReading from '../components/FinishedReading'
import TotalBeardStrokes from '../components/TotalBeardStrokes'

export default function Snippet({ data }) {
  const snippet = data.mdx
  const { name, slug } = snippet.frontmatter

  return (
    <Fragment>
      <Seo title={`${name} | Snippets`} />

      <h4 css={{ fontWeight: 700, marginBottom: 0 }}>Snippet</h4>
      <h2>{name}</h2>
      <TotalBeardStrokes slug={`snippets/${slug}`} />

      <div>
        <MDXRenderer>{snippet.body}</MDXRenderer>
      </div>

      <hr />

      <Spacer bottom={2}>
        <FinishedReading slug={`snippets/${slug}`} title={name} />
      </Spacer>

      <hr />

      <AddedValue />
    </Fragment>
  )
}

export const pageQuery = graphql`
  query Snippet($slug: String) {
    mdx(
      fileAbsolutePath: { regex: "/snippets/" }
      frontmatter: { slug: { eq: $slug } }
    ) {
      body
      frontmatter {
        name
        slug
      }
    }
  }
`
