import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { lighten } from 'polished'
import { COLORS } from '../constants'
import { bs } from '../shevy'

const Wrap = styled.div`
  font-family: 'Catamaran', sans-serif;
  margin-bottom: ${bs(2)};
`

const baseItemStyles = css`
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin-right: 3px;
  margin-bottom: 3px;
`

const itemStyles = css`
  ${baseItemStyles};
  background-color: ${COLORS.teal};
  color: ${COLORS.white};

  &:hover {
    background-color: ${lighten(0.1, COLORS.teal)};
    color: ${COLORS.white};
  }
`

const nonLinkItemStyles = css`
  ${baseItemStyles};
  background-color: ${COLORS.lightGray};
  color: ${COLORS.teal};
`

const Pagination = ({ index: currentPageIndex, totalPages }) => {
  const currentPageNumber = currentPageIndex + 1
  const prevPageNumber = currentPageNumber - 1
  const nextPageNumber = currentPageNumber + 1

  return (
    <Wrap>
      {currentPageIndex !== 0 ? (
        <Link
          css={itemStyles}
          to={prevPageNumber === 0 ? '/' : `/page-${prevPageNumber}`}
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
    </Wrap>
  )
}

export default Pagination
