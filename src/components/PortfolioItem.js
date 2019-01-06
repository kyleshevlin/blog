import React, { Component } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { rem, rgba } from 'polished'
import { BREAKPOINTS, COLORS } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'

const Wrap = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;

  &:hover {
    [data-item-link]:before {
      background-color: ${rgba(COLORS.teal, 0.5)};
      top: 0;
      bottom: 0;
    }

    [data-title] {
      opacity: 1;
    }
  }
`

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
`

const linkStyles = css`
  display: block;

  &:before {
    content: '';
    display: block;
    background-color: transparent;
    position: absolute;
    top: 30%;
    right: 0;
    bottom: 30%;
    left: 0;
    transition: background-color 0.3s ease, top 0.3s ease, bottom 0.3s ease;
  }
`

const titleStyles = css`
  width: 100%;
  color: ${COLORS.white};
  font-size: ${rem(35)};
  line-height: 1;
  text-align: center;
  padding-left: ${bs(0.5)};
  padding-right: ${bs(0.5)};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${createMediaQuery(BREAKPOINTS.alpha)} {
    font-size: ${rem(25)};
  }

  ${createMediaQuery(BREAKPOINTS.delta)} {
    font-size: ${rem(30)};
  }
`

class PortfolioItem extends Component {
  render() {
    const { slug, squareImage, title } = this.props

    return (
      <Wrap>
        <Image src={squareImage.publicURL} />
        <Link css={linkStyles} to={`portfolio/${slug}`} data-item-link>
          <div css={titleStyles} data-title>
            {title}
          </div>
        </Link>
      </Wrap>
    )
  }
}

export default PortfolioItem
