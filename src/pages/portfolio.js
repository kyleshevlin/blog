import React from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { BREAKPOINTS } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PortfolioItem from '../components/PortfolioItem'

const ItemsWrap = styled.div`
  display: grid;
  margin-top: ${bs()};
  margin-bottom: ${bs()};

  ${createMediaQuery(BREAKPOINTS.alpha)} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${bs(0.25)};
  }

  ${createMediaQuery(BREAKPOINTS.bravo)} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Portfolio = ({ data }) => {
  const items = data.allMarkdownRemark.edges.map(edge => edge.node)

  return (
    <Layout>
      <SEO title="Portfolio" keywords={['Portfolio', 'Kyle Shevlin']} />
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

      <ItemsWrap>
        {items.map(item => {
          const {
            frontmatter: { slug, squareImage, title }
          } = item

          return <PortfolioItem key={slug} {...{ slug, squareImage, title }} />
        })}
      </ItemsWrap>
    </Layout>
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
