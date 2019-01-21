import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import BannerImage from '../components/BannerImage'
import PostDate from '../components/PostDate'
import PostHeader from '../components/PostHeader'
import PostContent from '../components/PostContent'
import Seo from '../components/Seo'

const Portfolio = ({ data }) => {
  const portfolioItem = data.markdownRemark
  const {
    html,
    frontmatter: { bannerImage, date, subtitle, title }
  } = portfolioItem

  return (
    <Fragment>
      <Seo title={`${title} | Portfolio`} />

      <div>
        {bannerImage && (
          <BannerImage
            src={bannerImage.childImageSharp.original.src}
            alt={`${title} Banner`}
          />
        )}
        <PostDate date={date} />
        <PostHeader {...{ subtitle, title }} />
        <PostContent content={html} />
      </div>
    </Fragment>
  )
}

export default Portfolio

export const pageQuery = graphql`
  query PortfolioQuery($slug: String!) {
    markdownRemark(
      fileAbsolutePath: { regex: "/portfolio/" }
      frontmatter: { slug: { eq: $slug } }
    ) {
      html
      frontmatter {
        bannerImage {
          childImageSharp {
            original {
              src
            }
          }
        }
        date(formatString: "MMMM DD, YYYY")
        subtitle
        title
      }
    }
  }
`
