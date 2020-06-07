import React from 'react'
import debounce from 'lodash.debounce'
import {
  Configure,
  connectHits,
  connectPagination,
  connectSearchBox,
  connectStateResults,
  Highlight,
  InstantSearch,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import { Link } from 'gatsby'
import shevy, { bs } from '../shevy'
import Container from './Container'
import Modal from './Modal'
import SearchIcon from './icons/Search'
import CloseIcon from './icons/Close'
import * as PaginationStyles from './Pagination'
import { v } from '../utils'

const SearchBox = connectSearchBox(({ refine }) => {
  const debouncedRefine = debounce(event => {
    refine(event.target.value)
  }, 500)

  const handleChange = event => {
    event.persist()
    debouncedRefine(event)
  }

  return (
    <div css={{ marginBottom: bs(0.5) }}>
      {/* Regarding the lint error below, it has htmlFor, don't know what it's yelling about */}
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label
        css={{
          ...shevy.h5,
          display: 'block',
          fontFamily: v('fonts-catamaran'),
          fontWeight: 'bold',
          marginBottom: bs(0.125),
        }}
        htmlFor="search"
      >
        Search Query
      </label>
      <input
        css={{
          color: v('components-searchBox-text'),
          border: `1px solid ${v('colors-offsetMore')}`,
          borderRadius: 4,
          display: 'block',
          fontFamily: v('fonts-catamaran'),
          padding: `${bs(0.25)} ${bs(0.5)}`,
          width: '100%',
        }}
        id="search"
        name="search"
        onChange={handleChange}
        type="search"
      />
    </div>
  )
})

const Hits = connectHits(({ closeModal, hits }) => {
  return (
    <div css={{ display: 'flex', flexWrap: 'wrap' }}>
      <div
        css={{
          fontFamily: v('fonts-catamaran'),
          fontSize: '.85rem',
          fontStyle: 'italic',
          marginBottom: bs(),
          maxWidth: '30rem',
        }}
      >
        These are the results of your search. The title and excerpt are
        displayed, though your search may have been found in the content of the
        post as well.
      </div>

      {hits.map(hit => {
        return (
          <div css={{ marginBottom: bs() }} key={hit.objectID}>
            <Link
              css={{ display: 'block', marginBottom: bs(0.5) }}
              onClick={closeModal}
              to={hit.slug}
            >
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
  )
})

const Pagination = connectPagination(
  ({ createURL, currentRefinement, nbPages, refine }) => {
    return (
      <div css={{ fontFamily: v('fonts-catamaran') }}>
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
  }
)

const Results = connectStateResults(({ closeModal, error, searchResults }) => {
  if (error) {
    return (
      <div
        css={{
          backgroundColor: v('components-searchError-background'),
          color: v('components-searchError-text'),
          padding: `${bs(0.5)} ${bs()}`,
        }}
      >
        Sorry, there was an error and search is unavailable at this time. Please
        try again later.
      </div>
    )
  }

  return searchResults &&
    searchResults.query &&
    searchResults.query.length > 0 ? (
    <>
      <Hits closeModal={closeModal} />
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
          fontFamily: v('fonts-catamaran'),
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
          <SearchIcon stroke={v('colors-text')} width={20} />
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
                <CloseIcon stroke={v('colors-text')} width={16} />
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
                <Results
                  closeModal={() => {
                    setIsModalOpen(false)
                  }}
                />
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
