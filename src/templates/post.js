import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const Post = ({ data }) => {
  const post = data.markdownRemark
  const {
    html,
    frontmatter: { date, subtitle, title }
  } = post

  return (
    <Layout>
      <div>
        <div>{date}</div>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
        date
      }
    }
  }
`
