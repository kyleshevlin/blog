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
    const portfolioTemplate = path.resolve('src/templates/portfolio.js')
    const query = graphql(`
      {
        posts: allFile(filter: { sourceInstanceName: { eq: "posts" } }) {
          edges {
            node {
              id
              childMarkdownRemark {
                html
                frontmatter {
                  title
                  subtitle
                  date
                  slug
                }
              }
            }
          }
        }

        portfolio: allFile(
          filter: { sourceInstanceName: { eq: "portfolio" } }
        ) {
          edges {
            node {
              id
              childMarkdownRemark {
                html
                frontmatter {
                  title
                  subtitle
                  slug
                }
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

        result.data.posts.edges.forEach(edge => {
          const { slug } = edge.node.childMarkdownRemark.frontmatter
          const pageOptions = {
            path: slug,
            component: postTemplate,
            context: { slug }
          }

          createPage(pageOptions)
        })

        result.data.portfolio.edges.forEach(edge => {
          const { slug } = edge.node.childMarkdownRemark.frontmatter
          const pageOptions = {
            path: `portfolio/${slug}`,
            component: portfolioTemplate,
            context: { slug }
          }

          createPage(pageOptions)
        })

        return
      })
    )
  })
}
