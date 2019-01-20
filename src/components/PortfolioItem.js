import React, { Component } from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { rem, rgba } from 'polished'
import { BREAKPOINTS, COLORS } from '../constants'
import { bs } from '../shevy'
import { createMediaQuery } from '../utils'

const linkStyles = css`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

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
  line-height: 1.2;
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
    const { shortTitle, slug, squareImage, title } = this.props

    return (
      <div
        css={{
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          '&:hover': {
            '[data-item-link]:before': {
              backgroundColor: rgba(COLORS.teal, 0.5),
              top: 0,
              bottom: 0
            },
            '[data-title]': {
              opacity: 1
            }
          }
        }}
      >
        <img
          css={{
            display: 'block',
            height: 'auto',
            width: '100%'
          }}
          alt={title}
          src={squareImage.publicURL}
        />
        <Link css={linkStyles} to={`portfolio/${slug}`} data-item-link>
          <div css={titleStyles} data-title>
            {shortTitle ? shortTitle : title}
          </div>
        </Link>
      </div>
    )
  }
}

export default PortfolioItem
