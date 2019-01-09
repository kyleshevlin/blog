import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'
import { BREAKPOINTS } from '../constants'

const Wrap = styled.div`
  padding-left: ${bs()};
  padding-right: ${bs()};
  margin-top: ${bs(4)};
  margin-bottom: ${bs(2)};

  ${createMediaQuery(BREAKPOINTS.alpha)} {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: ${bs()};
    align-items: center;
  }
`

const Image = styled.img`
  display: block;
  width: 100%;
  max-width: 180px;
  height: auto;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${bs()};

  ${createMediaQuery(BREAKPOINTS.alpha)} {
    margin-bottom: 0;
  }
`

const query = graphql`
  query {
    site {
      siteMetadata {
        description
      }
    }
    allImageSharp(filter: { original: { src: { regex: "/kyle400/" } } }) {
      edges {
        node {
          original {
            src
          }
        }
      }
    }
  }
`

const PostAuthor = () => (
  <StaticQuery
    query={query}
    render={({ allImageSharp, site }) => (
      <Wrap>
        <Image
          src={allImageSharp.edges[0].node.original.src}
          alt="Kyle Shevlin's face, which is mostly a beard with eyes"
        />
        <div>{site.siteMetadata.description}</div>
      </Wrap>
    )}
  />
)

export default PostAuthor
