import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { BREAKPOINTS, COLORS } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'
import Container from './Container'

const ValueSell = () => (
  <StaticQuery
    query={graphql`
      query EggheadCourseImage {
        allImageSharp(
          filter: { original: { src: { regex: "/Just-Enough/" } } }
        ) {
          edges {
            node {
              id
              original {
                src
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { src } = data.allImageSharp.edges[0].node.original
      const eggheadUrl =
        'https://egghead.io/courses/just-enough-functional-programming-in-javascript'

      return (
        <div
          css={{
            backgroundColor: COLORS.lightGray,
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
                <a href={eggheadUrl}>
                  <img
                    css={{
                      display: 'block',
                      width: '100%',
                      transition: 'opacity 0.3s ease',
                      '&:hover': {
                        opacity: 0.85
                      }
                    }}
                    src={src}
                    alt="Just Enough Functional Programming in JavaScript Logo"
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
                <h2>Check out my latest course on Egghead!</h2>
                <a href={eggheadUrl}>
                  <h3>Just Enough Functional Programming in JavaScript</h3>
                </a>
              </div>
            </div>
          </Container>
        </div>
      )
    }}
  />
)

export default ValueSell
