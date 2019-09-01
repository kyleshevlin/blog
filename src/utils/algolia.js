const mdxQuery = `{
  allMdx(
    filter: { fileAbsolutePath: { regex: "/posts/" } }
  ) {
    edges {
      node {
        excerpt
        frontmatter {
          categories
          description
          keywords
          shortTitle
          slug
          subtitle
          tags
          title
        }
        objectID: id
        rawBody
      }
    }
  }
}`

const unnestFrontmatter = node => {
  const { frontmatter, ...rest } = node

  return {
    ...frontmatter,
    ...rest
  }
}

const queries = [
  {
    query: mdxQuery,
    transformer: ({ data }) =>
      data.allMdx.edges.map(edge => edge.node).map(unnestFrontmatter)
  }
]

module.exports = queries
