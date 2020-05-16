const mdxQuery = `{
  allMdx(filter: {fileAbsolutePath: {regex: "/posts/"}}) {
    edges {
      node {
        excerpt
        frontmatter {
          description
          slug
          subtitle
          tags
          title
          keywords
        }
        rawBody
      }
    }
  }
}
`

const unnestFrontmatter = node => {
  const { frontmatter, ...rest } = node

  return {
    ...frontmatter,
    ...rest,
  }
}

const handleRawBody = node => {
  const { rawBody, ...rest } = node

  // To improve search with smaller record sizes, we will divide all
  // blog posts into sections (essentially by paragraph).
  const sections = rawBody.split('\n\n')
  const records = sections.map(section => ({
    ...rest,
    content: section,
  }))

  return records
}

const queries = [
  {
    query: mdxQuery,
    settings: {
      attributeForDistinct: 'slug',
      distinct: true,
    },
    transformer: ({ data }) =>
      data.allMdx.edges
        .map(edge => edge.node)
        .map(unnestFrontmatter)
        .map(handleRawBody)
        .reduce((acc, cur) => [...acc, ...cur], []),
  },
]

module.exports = queries
