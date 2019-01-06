const path = require('path')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const excerptListTemplate = path.resolve('src/templates/ExcerptList.js')
    const postTemplate = path.resolve('src/templates/post.js')
    const portfolioTemplate = path.resolve('src/templates/portfolio.js')
    const query = graphql(`
      {
        posts: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/posts/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                title
                slug
                date(formatString: "MMMM DD, YYYY")
                categories
              }
              excerpt
            }
          }
        }

        portfolio: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/portfolio/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                title
                slug
                date(formatString: "MMMM DD, YYYY")
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

        const allPosts = result.data.posts.edges

        // Create paginated Excerpt pages
        const postsPerPage = 6
        const totalPages = Math.ceil(allPosts.length / postsPerPage)
        Array.from({ length: totalPages }).forEach((_, index) => {
          createPage({
            path: index === 0 ? '/' : `/page-${index + 1}`,
            component: excerptListTemplate,
            context: {
              allPostsLength: allPosts.length,
              totalPages,
              index,
              limit: postsPerPage,
              skip: index * postsPerPage
            }
          })
        })

        // Create individual Post pages
        allPosts.forEach(post => {
          const { slug } = post.node.frontmatter

          createPage({
            path: slug,
            component: postTemplate,
            context: { slug }
          })
        })

        // Create individual Portfolio pages
        result.data.portfolio.edges.forEach(edge => {
          const { slug } = edge.node.frontmatter

          createPage({
            path: `portfolio/${slug}`,
            component: portfolioTemplate,
            context: { slug }
          })
        })

        return
      })
    )
  })
}
