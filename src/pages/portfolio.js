import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import { BREAKPOINTS } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'
import Seo from '../components/Seo'
import PortfolioItem from '../components/PortfolioItem'

const itemsWrapStyles = {
  display: 'grid',
  marginTop: bs(),
  marginBottom: bs(),

  [createMediaQuery(BREAKPOINTS.alpha)]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: bs(0.25)
  },

  [createMediaQuery(BREAKPOINTS.bravo)]: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  }
}

const Portfolio = ({ data }) => {
  const publishedItems = data.published.edges.map(edge => edge.node)
  const archivedItems = data.archived.edges.map(edge => edge.node)

  return (
    <Fragment>
      <Seo title="Portfolio" keywords={['Portfolio', 'Kyle Shevlin']} />
      <h1>Portfolio</h1>

      <p>
        I approach projects and talks like a craftsperson. I enjoy the process
        of architecting a project, improving it wherever possible, and take a
        lot of pride in my work.
      </p>

      <p>
        Below are a few of the sites, talks, and tools I have crafted. Click on
        the image to read more about the project.
      </p>

      <div css={itemsWrapStyles}>
        {publishedItems.map(item => {
          const { frontmatter } = item

          return <PortfolioItem key={frontmatter.slug} {...frontmatter} />
        })}
      </div>

      <div>
        <h4>Archived Items</h4>
        {archivedItems.map(item => {
          const {
            frontmatter: { slug, title }
          } = item

          return (
            <div key={slug}>
              <Link to={`/portfolio/${slug}`}>{title}</Link>
            </div>
          )
        })}
      </div>
    </Fragment>
  )
}

export default Portfolio

export const query = graphql`
  query PortfolioItemsQuery {
    published: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/portfolio/" }
        frontmatter: { status: { eq: "published" } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            shortTitle
            slug
            squareImage {
              publicURL
            }
            title
          }
        }
      }
    }
    archived: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/portfolio/" }
        frontmatter: { status: { eq: "archived" } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`
