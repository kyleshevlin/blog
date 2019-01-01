const path = require('path')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  console.log('createPages')

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('src/templates/post.js')
    const query = graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `)

    resolve(
      query.then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(edge => {
          const { slug } = edge.node.frontmatter
          const pageOptions = {
            path: slug,
            component: postTemplate,
            context: { slug }
          }

          createPage(pageOptions)
        })

        return
      })
    )
  })
}
