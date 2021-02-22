import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { bs } from '../shevy'
import { mq } from '../utils'

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
      <div
        css={{
          paddingLeft: bs(),
          paddingRight: bs(),
          marginTop: bs(4),
          marginBottom: bs(2),

          [mq.alpha]: {
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
            gridGap: bs(),
            alignItems: 'center',
          },
        }}
      >
        <img
          css={{
            display: 'block',
            width: '100%',
            maxWidth: '180px',
            height: 'auto',
            borderRadius: '50%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: bs(),

            [mq.alpha]: {
              marginBottom: 0,
            },
          }}
          src={allImageSharp.edges[0].node.original.src}
          alt="Kyle Shevlin's face, which is mostly a beard with eyes"
        />
        <div>{site.siteMetadata.description}</div>
      </div>
    )}
  />
)

export default PostAuthor
