import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { mq } from '../utils'
import { useSpacing } from '@kyleshevlin/layout'

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

const PostAuthor = () => {
  const bs = useSpacing()
  return (
    <StaticQuery
      query={query}
      render={({ allImageSharp, site }) => (
        <div
          css={{
            paddingLeft: bs(1),
            paddingRight: bs(1),

            [mq.alpha]: {
              display: 'grid',
              gridTemplateColumns: '1fr 3fr',
              gridGap: bs(1),
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
              marginBottom: bs(1),

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
}

export default PostAuthor
