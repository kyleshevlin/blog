// const queries = require('./src/utils/algolia')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Kyle Shevlin',
    subTitle: 'Software Engineer',
    description:
      'Kyle Shevlin is a software engineer who specializes in JavaScript, React and front end web development.',
    author: 'Kyle Shevlin',
    siteUrl: 'https://kyleshevlin.com',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        url: 'https://api.github.com/graphql',
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_GITHUB_TOKEN}`,
        },
      },
    },
    // {
    //   resolve: 'gatsby-plugin-algolia',
    //   options: {
    //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //     indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    //     queries,
    //     chunkSize: 10000
    //   }
    // },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-portal',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/posts/published`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'collections',
        path: `${__dirname}/src/collections`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'courses',
        path: `${__dirname}/src/courses`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'snippets',
        path: `${__dirname}/src/snippets`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-20937423-1',
        head: true,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          query {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { allMdx, site } }) => {
              const { siteUrl } = site.siteMetadata

              return allMdx.edges.map(edge => {
                const {
                  html,
                  frontmatter: { date, slug, subtitle, title },
                } = edge.node

                return {
                  title,
                  date,
                  description: html,
                  url: `${siteUrl}/${slug}`,
                  custom_elements: [{ subtitle }],
                }
              })
            },
            query: `
              query {
                allMdx(
                  filter: {fileAbsolutePath: {regex: "/posts/"}}
                  limit: 1000
                  sort: {fields: [frontmatter___date], order: DESC}
                ) {
                  edges {
                    node {
                      html
                      frontmatter {
                        title
                        date
                        slug
                        subtitle
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Kyle Shevlin's Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Kyle Shevlin',
        short_name: 'kyleshevlin',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fff',
        display: 'minimal-ui',
        // This path is relative to the root of the site.
        icon: 'src/images/beard-favicon.png',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    'gatsby-plugin-emotion',
  ],
}
