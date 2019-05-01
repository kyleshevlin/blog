module.exports = {
  siteMetadata: {
    title: 'Kyle Shevlin',
    subTitle: 'Front End Web Developer',
    description:
      'Kyle Shevlin is a front end web developer and software engineer who specializes in JavaScript and React.',
    author: 'Kyle Shevlin',
    siteUrl: 'https://kyleshevlin.com'
  },
  plugins: [
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true
            }
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/published`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `portfolio`,
        path: `${__dirname}/src/portfolio/published`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'courses',
        path: `${__dirname}/src/courses`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true
            }
          }
        ]
      }
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-twitter',
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-20937423-1',
        head: true
      }
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
            serialize: ({ query: { allMarkdownRemark, site } }) => {
              const { siteUrl } = site.siteMetadata

              return allMarkdownRemark.edges.map(edge => {
                const {
                  html,
                  frontmatter: { date, slug, subtitle, title }
                } = edge.node

                return {
                  title,
                  date,
                  description: html,
                  url: `${siteUrl}/${slug}`,
                  custom_elements: [{ subtitle }]
                }
              })
            },
            query: `
              query {
                allMarkdownRemark(
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
            title: "Kyle Shevlin's Blog RSS Feed"
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kyle Shevlin`,
        short_name: `kyleshevlin`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `minimal-ui`,
        // This path is relative to the root of the site.
        icon: `src/images/beard-favicon.png`
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
}
