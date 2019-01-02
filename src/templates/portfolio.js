import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const Portfolio = ({ data }) => {
  const portfolioItem = data.markdownRemark
  const {
    html,
    frontmatter: { subtitle, title }
  } = portfolioItem

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export default Portfolio

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
      }
    }
  }
`
