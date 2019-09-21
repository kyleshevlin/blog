import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { lighten } from 'polished'
import { COLORS, FONTS } from '../constants'
import { bs } from '../shevy'

export const baseItemStyles = css`
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin-right: 3px;
  margin-bottom: 3px;
`

export const itemStyles = css`
  ${baseItemStyles};
  background-color: ${COLORS.teal};
  color: ${COLORS.white};

  &:hover {
    background-color: ${lighten(0.1, COLORS.teal)};
    color: ${COLORS.white};
  }
`

export const nonLinkItemStyles = css`
  ${baseItemStyles};
  background-color: ${COLORS.lightGray};
  color: ${COLORS.teal};
`

const Pagination = ({ index: currentPageIndex, totalPages }) => {
  const currentPageNumber = currentPageIndex + 1
  const prevPageNumber = currentPageNumber - 1
  const nextPageNumber = currentPageNumber + 1

  return (
    <div
      css={{
        fontFamily: FONTS.catamaran,
        marginBottom: bs(2)
      }}
    >
      {currentPageIndex !== 0 ? (
        <Link
          css={itemStyles}
          to={prevPageNumber > 1 ? `/page-${prevPageNumber}` : `/`}
        >
          Previous
        </Link>
      ) : null}

      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1

        return index === currentPageIndex ? (
          <div key={index} css={nonLinkItemStyles}>
            {pageNumber}
          </div>
        ) : (
          <Link
            css={itemStyles}
            key={index}
            to={index === 0 ? '/' : `/page-${pageNumber}`}
          >
            {pageNumber}
          </Link>
        )
      })}

      {currentPageIndex !== totalPages - 1 ? (
        <Link css={itemStyles} to={`/page-${nextPageNumber}`}>
          Next
        </Link>
      ) : null}
    </div>
  )
}

export default Pagination
