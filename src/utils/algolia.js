const mdxQuery = `{
  allMdx(filter: {fileAbsolutePath: {regex: "/posts/"}}) {
    edges {
      node {
        excerpt
        frontmatter {
          categories
          description
          slug
          subtitle
          tags
          title
          keywords
        }
        objectID: id
      }
    }
  }
}
`

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
