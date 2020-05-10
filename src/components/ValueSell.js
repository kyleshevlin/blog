import React from 'react'
import { useTheme } from 'emotion-theming'
import { graphql, StaticQuery } from 'gatsby'
import { BREAKPOINTS, EGGHEAD_AFFILIATE_QUERY_PARAM } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'
import Container from './Container'

export default function ValueSell() {
  const theme = useTheme()

  return (
    <StaticQuery
      query={graphql`
        query LatestCourse {
          allCoursesJson(sort: { fields: date, order: DESC }, limit: 1) {
            edges {
              node {
                logo {
                  publicURL
                }
                title
                eggheadUrl
              }
            }
          }
        }
      `}
      render={data => {
        const {
          logo: { publicURL },
          title,
          eggheadUrl
        } = data.allCoursesJson.edges[0].node
        const eggheadUrlWithParams = eggheadUrl + EGGHEAD_AFFILIATE_QUERY_PARAM

        return (
          <div
            css={{
              backgroundColor: theme.colors.offset,
              paddingTop: bs(2),
              paddingBottom: bs(2)
            }}
          >
            <Container>
              <div
                css={{
                  [createMediaQuery(BREAKPOINTS.alpha)]: {
                    display: 'grid',
                    gridGap: bs(),
                    gridTemplateColumns: '1fr 3fr',
                    alignItems: 'center'
                  }
                }}
              >
                <div
                  css={{
                    marginBottom: bs(),
                    [createMediaQuery(BREAKPOINTS.alphs)]: {
                      marginBottom: 0
                    }
                  }}
                >
                  <a href={eggheadUrlWithParams}>
                    <img
                      css={{
                        display: 'block',
                        width: '100%',
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                          opacity: 0.85
                        }
                      }}
                      src={publicURL}
                      alt={`${title} Logo`}
                    />
                  </a>
                </div>
                <div
                  css={{
                    textAlign: 'center',
                    [createMediaQuery(BREAKPOINTS.alpha)]: {
                      textAlign: 'left'
                    }
                  }}
                >
                  <h2>Check out my latest course on egghead.io!</h2>
                  <a href={eggheadUrlWithParams}>
                    <h3>{title}</h3>
                  </a>
                </div>
              </div>
            </Container>
          </div>
        )
      }}
    />
  )
}
