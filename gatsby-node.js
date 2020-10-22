/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

const formatStrForPath = str =>
  str
    .toLowerCase()
    .split(' ')
    .join('-')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const homeTemplate = path.resolve('src/templates/Home.js')
    const additionalPagesTemplate = path.resolve(
      'src/templates/AdditionalPages.js'
    )
    const postTemplate = path.resolve('src/templates/Post.js')
    const allTags = path.resolve('src/templates/AllTags.js')
    const tagsTemplate = path.resolve('src/templates/Tags.js')
    const query = graphql(`
      {
        posts: allMdx(
          filter: { fileAbsolutePath: { regex: "/posts/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                relatedPostsSlugs
                slug
                tags
                title
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
        const postsPerPage = 10
        const totalPages = Math.ceil(allPosts.length / postsPerPage)
        Array.from({ length: totalPages }).forEach((_, index) => {
          createPage({
            path: index === 0 ? '/' : `/page-${index + 1}`,
            component: index === 0 ? homeTemplate : additionalPagesTemplate,
            context: {
              allPostsLength: allPosts.length,
              totalPages,
              index,
              limit: postsPerPage,
              skip: index * postsPerPage,
            },
          })
        })

        // Create individual Post pages
        allPosts.forEach((post, index) => {
          const { relatedPostsSlugs, slug } = post.node.frontmatter
          const older = allPosts[index + 1]
          const newer = allPosts[index - 1]
          let relatedPosts = null

          if (relatedPostsSlugs) {
            relatedPosts = relatedPostsSlugs
              .map(slug =>
                allPosts.find(post => post.node.frontmatter.slug === slug)
              )
              .filter(Boolean)
              .map(post => {
                const { slug, title } = post.node.frontmatter
                return { slug, title }
              })
          }

          createPage({
            path: slug,
            component: postTemplate,
            context: {
              olderPost: older ? older.node : null,
              newerPost: newer ? newer.node : null,
              relatedPosts,
              slug,
            },
          })
        })

        // Reduce tags
        const tags = allPosts.reduce((acc, post) => {
          const { tags } = post.node.frontmatter

          if (!tags) {
            return acc
          }

          tags.forEach(tag => {
            acc.add(tag)
          })

          return acc
        }, new Set())

        // Create All Tags page
        createPage({
          path: 'tags',
          component: allTags,
          context: {
            tags: Array.from(tags),
          },
        })

        // Create individual Tag pages
        tags.forEach(tag => {
          createPage({
            path: `/tags/${formatStrForPath(tag)}`,
            component: tagsTemplate,
            context: {
              tag,
            },
          })
        })
      })
    )
  })
}
