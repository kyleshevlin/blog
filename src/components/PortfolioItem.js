import React from 'react'
import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { Link } from 'gatsby'
import { rem, rgba } from 'polished'
import { BREAKPOINTS } from '../constants'
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

const titleStyles = theme => {
  const {
    components: { portfolioItem: portfolioItemTheme }
  } = theme

  return {
    width: '100%',
    color: portfolioItemTheme.text,
    fontSize: rem(35),
    lineHeight: 1.2,
    textAlign: 'center',
    paddingLeft: bs(0.5),
    paddingRight: bs(0.5),
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',

    [createMediaQuery(BREAKPOINTS.alpha)]: {
      fontSize: rem(25)
    },

    [createMediaQuery(BREAKPOINTS.delta)]: {
      fontSize: rem(30)
    }
  }
}

export default function PortfolioItem({
  shortTitle,
  slug,
  squareImage,
  title
}) {
  const theme = useTheme()

  return (
    <div
      css={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        '&:hover': {
          '[data-item-link]:before': {
            backgroundColor: rgba(theme.colors.accent, 0.5),
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
