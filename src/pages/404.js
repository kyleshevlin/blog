import React from 'react'
import { graphql, Link } from 'gatsby'
import Seo from '../components/Seo'
import { bs } from '../shevy'
import AddedValue from '../components/AddedValue'
import Container from '../components/Container'
import Main from '../components/Main'

const linkStyles = {
  display: 'block',
  marginBottom: bs(0.5),
}

const NotFoundPage = ({ data }) => (
  <Container>
    <Main>
      <Seo title="404: Not found" />
      <h1>Not Found</h1>

      <p>
        Sorry, you've hit a URL that doesn't exist! That's a bummer. Please try
        a different URL or perhaps choose one of the blog posts listed below.
      </p>

      {data.allMdx.edges
        .map(edge => edge.node)
        .map(post => {
          const { slug, title } = post.frontmatter

          return (
            <Link css={linkStyles} key={slug} to={slug}>
              {title}
            </Link>
          )
        })}

      <AddedValue />
    </Main>
  </Container>
)

export default NotFoundPage

export const pageQuery = graphql`
  {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      limit: 5
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
