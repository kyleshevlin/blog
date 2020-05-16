import React from 'react'
import { Link } from 'gatsby'
import { useTheme } from 'emotion-theming'
import { lighten } from 'polished'
import { bs } from '../shevy'

export const baseItemStyles = {
  display: 'inline-block',
  height: 30,
  lineHeight: '30px',
  padding: '0 10px',
  marginRight: 3,
  marginBottom: 3,
}

export const itemStyles = theme => {
  const {
    components: { pagination },
  } = theme

  return {
    ...baseItemStyles,
    backgroundColor: pagination.normal.background,
    color: pagination.normal.text,

    '&:hover': {
      backgroundColor: lighten(0.1, pagination.normal.background),
      color: pagination.normal.text,
    },
  }
}

export const nonLinkItemStyles = theme => {
  const {
    components: { pagination },
  } = theme

  return {
    ...baseItemStyles,
    backgroundColor: pagination.active.background,
    color: pagination.active.text,
  }
}

export default function Pagination({ index: currentPageIndex, totalPages }) {
  const theme = useTheme()

  const currentPageNumber = currentPageIndex + 1
  const prevPageNumber = currentPageNumber - 1
  const nextPageNumber = currentPageNumber + 1

  return (
    <div
      css={{
        fontFamily: theme.fonts.catamaran,
        marginBottom: bs(2),
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
