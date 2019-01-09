import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import { BREAKPOINTS, COLORS } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'
import Container from './Container'

const Wrap = styled.div`
  background-color: ${COLORS.lightGray};
  padding-top: ${bs(2)};
  padding-bottom: ${bs(2)};
`

const Inner = styled.div`
  ${createMediaQuery(BREAKPOINTS.alpha)} {
    display: grid;
    grid-gap: ${bs()};
    grid-template-columns: 1fr 3fr;
    align-items: center;
  }
`

const ImageWrap = styled.div`
  margin-bottom: ${bs()};

  ${createMediaQuery(BREAKPOINTS.alpha)} {
    margin-bottom: 0;
  }
`

const Image = styled.img`
  display: block;
  width: 100%;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.85;
  }
`

const Content = styled.div`
  text-align: center;

  ${createMediaQuery(BREAKPOINTS.alpha)} {
    text-align: left;
  }
`

const ValueSell = () => (
  <StaticQuery
    query={graphql`
      query EggheadCourseImage {
        allImageSharp(filter: { original: { src: { regex: "/DSA/" } } }) {
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
        'https://egghead.io/courses/data-structures-and-algorithms-in-javascript'

      return (
        <Wrap>
          <Container>
            <Inner>
              <ImageWrap>
                <a href={eggheadUrl}>
                  <Image
                    src={src}
                    alt="Data Structures and Algorithms in JavaScript Logo"
                  />
                </a>
              </ImageWrap>
              <Content>
                <h2>Check out my latest course on Egghead!</h2>
                <a href={eggheadUrl}>
                  <h3>Data Structures and Algorithms in JavaScript</h3>
                </a>
              </Content>
            </Inner>
          </Container>
        </Wrap>
      )
    }}
  />
)

export default ValueSell
