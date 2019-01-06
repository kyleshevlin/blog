import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostDate from '../components/PostDate'
import PostHeader from '../components/PostHeader'
import PostContent from '../components/PostContent'

const Portfolio = ({ data }) => {
  const portfolioItem = data.markdownRemark
  const {
    html,
    frontmatter: { bannerImage, date, subtitle, title }
  } = portfolioItem

  return (
    <Layout>
      <div>
        {bannerImage && (
          <div>
            <img
              src={bannerImage.childImageSharp.original.src}
              alt={`${title} Banner`}
            />
          </div>
        )}
        <PostDate date={date} />
        <PostHeader {...{ subtitle, title }} />
        <PostContent content={html} />
      </div>
    </Layout>
  )
}

export default Portfolio

export const pageQuery = graphql`
  query PortfolioQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        subtitle
        link
        bannerImage {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
    }
  }
`
