const path = require('path')

const formatStrForPath = str =>
  str
    .toLowerCase()
    .split(' ')
    .join('-')

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
    const postTemplate = path.resolve('src/templates/Post.js')
    const portfolioTemplate = path.resolve('src/templates/Portfolio.js')
    const allCategoriesOrTagsTemplate = path.resolve(
      'src/templates/AllCategoriesOrTags.js'
    )
    const categoriesTemplate = path.resolve('src/templates/Categories.js')
    const tagsTemplate = path.resolve('src/templates/Tags.js')
    const query = graphql(`
      {
        posts: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/posts/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                slug
                categories
                tags
              }
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
          const { categories, slug, tags } = post.node.frontmatter

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

        // Reduce categories and tags
        const categoriesAndTags = allPosts.reduce(
          (acc, post) => {
            const { categories, tags } = post.node.frontmatter

            if (!(categories || tags)) {
              return acc
            }

            if (categories) {
              categories.forEach(category => {
                acc.categories.add(category)
              })
            }

            if (tags) {
              tags.forEach(tag => {
                acc.tags.add(tag)
              })
            }

            return acc
          },
          { categories: new Set(), tags: new Set() }
        )

        const { categories, tags } = categoriesAndTags

        // Create All Categories page
        createPage({
          path: 'categories',
          component: allCategoriesOrTagsTemplate,
          context: {
            categories: Array.from(categories)
          }
        })

        // Create All Tags page
        createPage({
          path: 'tags',
          component: allCategoriesOrTagsTemplate,
          context: {
            tags: Array.from(tags)
          }
        })

        // Create individual Category pages
        categories.forEach(category => {
          createPage({
            path: `categories/${formatStrForPath(category)}`,
            component: categoriesTemplate,
            context: {
              category
            }
          })
        })

        // Create individual Tag pages
        tags.forEach(tag => {
          createPage({
            path: `/tags/${formatStrForPath(tag)}`,
            component: tagsTemplate,
            context: {
              tag
            }
          })
        })
      })
    )
  })
}
