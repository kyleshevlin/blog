import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
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
  const items = data.allMarkdownRemark.edges.map(edge => edge.node)

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
        {items.map(item => {
          const {
            frontmatter: { slug, squareImage, title }
          } = item

          return <PortfolioItem key={slug} {...{ slug, squareImage, title }} />
        })}
      </div>
    </Fragment>
  )
}

export default Portfolio

export const query = graphql`
  query PortfolioItemsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/portfolio/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            squareImage {
              publicURL
            }
          }
        }
      }
    }
  }
`
