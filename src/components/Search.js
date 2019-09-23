import React from 'react'
import {
  Configure,
  connectHits,
  connectPagination,
  connectSearchBox,
  connectStateResults,
  Highlight,
  InstantSearch
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import { Link } from 'gatsby'
import { COLORS, FONTS } from '../constants'
import shevy, { bs } from '../shevy'
import Container from './Container'
import Modal from './Modal'
import SearchIcon from './icons/Search'
import CloseIcon from './icons/Close'
import * as PaginationStyles from './Pagination'

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => {
  return (
    <div css={{ marginBottom: bs(0.5) }}>
      {/* Regarding the lint error below, it has htmlFor, don't know what it's yelling about */}
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label
        css={{
          ...shevy.h5,
          display: 'block',
          fontFamily: FONTS.catamaran,
          fontWeight: 'bold',
          marginBottom: bs(0.125)
        }}
        htmlFor="search"
      >
        Search Query
      </label>
      <input
        css={{
          border: `1px solid ${COLORS.gray}`,
          borderRadius: 4,
          display: 'block',
          fontFamily: FONTS.catamaran,
          padding: `${bs(0.25)} ${bs(0.5)}`,
          width: '100%'
        }}
        id="search"
        name="search"
        onChange={event => refine(event.currentTarget.value)}
        type="search"
        value={currentRefinement}
      />
    </div>
  )
})

const Hits = connectHits(({ hits }) => (
  <div css={{ display: 'flex', flexWrap: 'wrap' }}>
    <div
      css={{
        fontFamily: FONTS.catamaran,
        fontSize: '.85rem',
        fontStyle: 'italic',
        marginBottom: bs(),
        maxWidth: '30rem'
      }}
    >
      These are the results of your search. The title and excerpt are displayed,
      though your search may have been found in the content of the post as well.
    </div>

    {hits.map(hit => {
      return (
        <div css={{ marginBottom: bs() }} key={hit.objectID}>
          <Link css={{ display: 'block', marginBottom: bs(0.5) }} to={hit.slug}>
            <h4 css={{ marginBottom: 0 }}>
              <Highlight attribute="title" hit={hit} tagName="strong" />
            </h4>
            {hit.subtitle ? (
              <h5 css={{ marginBottom: 0 }}>
                <Highlight attribute="subtitle" hit={hit} tagName="strong" />
              </h5>
            ) : null}
          </Link>
          <div>
            <Highlight attribute="excerpt" hit={hit} tagName="strong" />
          </div>
        </div>
      )
    })}
  </div>
))

const Pagination = connectPagination(
  ({ createURL, currentRefinement, nbPages, refine }) => (
    <div css={{ fontFamily: FONTS.catamaran }}>
      {currentRefinement > 1 ? (
        <a
          css={PaginationStyles.itemStyles}
          href={createURL(currentRefinement - 1)}
          onClick={e => {
            e.preventDefault()
            refine(currentRefinement - 1)
          }}
        >
          Previous
        </a>
      ) : null}

      {Array(nbPages)
        .fill()
        .map((_, index) => {
          const page = index + 1

          return currentRefinement === page ? (
            <div css={PaginationStyles.nonLinkItemStyles} key={page}>
              {page}
            </div>
          ) : (
            <a
              css={PaginationStyles.itemStyles}
              href={createURL(page)}
              key={page}
              onClick={e => {
                e.preventDefault()
                refine(page)
              }}
            >
              {page}
            </a>
          )
        })}

      {currentRefinement < nbPages ? (
        <a
          css={PaginationStyles.itemStyles}
          href={createURL(currentRefinement + 1)}
          onClick={e => {
            e.preventDefault()
            refine(currentRefinement + 1)
          }}
        >
          Next
        </a>
      ) : null}
    </div>
  )
)

const Results = connectStateResults(({ searchResults }) => {
  return searchResults &&
    searchResults.query &&
    searchResults.query.length > 0 ? (
    <>
      <Hits />
      <Pagination />
    </>
  ) : null
})

export default function Search() {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const openButtonRef = React.useRef(null)
  const closeButtonRef = React.useRef(null)

  useCloseOnEsc(() => {
    setIsModalOpen(false)
    openButtonRef.current.focus()
  })

  return typeof document !== 'undefined' ? (
    <>
      <button
        aria-label="Open Modal"
        css={{
          backgroundColor: 'transparent',
          border: 'none',
          fontFamily: FONTS.catamaran
        }}
        onClick={() => {
          setIsModalOpen(true)
        }}
        ref={openButtonRef}
      >
        Search{' '}
        <span
          css={{ display: 'inline-block', verticalAlign: 'middle' }}
          role="img"
          aria-label="magnifying glass"
        >
          <SearchIcon stroke={COLORS.black} width={20} />
        </span>
      </button>

      {isModalOpen ? (
        <Modal
          ariaLabel="Search Modal"
          closeButtonRef={closeButtonRef}
          closeButtonText={
            <>
              Close Search{' '}
              <span role="img" aria-label="a black X">
                <CloseIcon stroke={COLORS.black} width={16} />
              </span>
            </>
          }
          onClick={() => {
            setIsModalOpen(false)
            openButtonRef.current.focus()
          }}
        >
          <Container>
            <div css={{ marginTop: bs(2), marginBottom: bs(2) }}>
              <InstantSearch
                searchClient={searchClient}
                indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
              >
                <Configure distinct />
                <div>
                  <SearchBox />
                </div>
                <Results />
              </InstantSearch>
            </div>
          </Container>
        </Modal>
      ) : null}
    </>
  ) : null
}

function useCloseOnEsc(fn) {
  React.useEffect(() => {
    const closeOnEsc = event => {
      if (event.key === 'Escape') {
        fn()
      }
    }

    document.addEventListener('keydown', closeOnEsc)

    return () => {
      document.removeEventListener('keydown', closeOnEsc)
    }
  })
}
