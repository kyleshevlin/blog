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
  marginBottom: 3
}

export const itemStyles = theme => ({
  ...baseItemStyles,
  backgroundColor: theme.colors.accent,
  color: theme.colors.background,

  '&:hover': {
    backgroundcolor: lighten(0.1, theme.colors.accent),
    color: theme.colors.background
  }
})

export const nonLinkItemStyles = theme => ({
  ...baseItemStyles,
  backgroundColor: theme.colors.offset,
  color: theme.colors.accent
})

export default function Pagination({ index: currentPageIndex, totalPages }) {
  const theme = useTheme()

  const currentPageNumber = currentPageIndex + 1
  const prevPageNumber = currentPageNumber - 1
  const nextPageNumber = currentPageNumber + 1

  return (
    <div
      css={{
        fontFamily: theme.fonts.catamaran,
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
