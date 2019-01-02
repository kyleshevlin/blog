module.exports = {
  siteMetadata: {
    title: 'Kyle Shevlin',
    subTitle: 'Front End Web Developer',
    description:
      'Kyle Shevlin is a front end web developer who specializes in JavaScript and React.',
    author: 'Kyle Shevlin'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
    },
    `gatsby-transformer-remark`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
}
