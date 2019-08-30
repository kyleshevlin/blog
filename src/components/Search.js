import React from 'react'
import {
  Hits,
  InstantSearch,
  Index,
  SearchBox,
  connectStateResults
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import { inflect } from '../utils'

const Results = connectStateResults(
  ({ children, searchResults, searchState }) =>
    searchResults && searchResults.nbHits
      ? children
      : `No hits for ${searchState.query}`
)

const Stats = connectStateResults(({ searchResults }) => {
  if (!searchResults) {
    return null
  }

  const { nbHits } = searchResults

  return nbHits > 0 ? `${nbHits} ${inflect('result', 'results', nbHits)}` : null
})

export default function Search({ indices }) {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  return (
    <InstantSearch searchClient={searchClient} indexName={indices[0].name}>
      <SearchBox />
      <div>
        {indices.map(({ name, title }) => (
          <Index key={name} indexName={name}>
            <header>
              <h3>{title}</h3>
              <Stats />
            </header>

            <Results>
              <Hits />
            </Results>
          </Index>
        ))}
      </div>
    </InstantSearch>
  )
}
