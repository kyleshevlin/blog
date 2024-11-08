import type { CollectionEntry } from 'astro:content'
import React from 'react'

const HEADINGS = ['Name', 'Description', 'Category'] as const

const HEADING_TO_KEY: Record<
  (typeof HEADINGS)[number],
  keyof CollectionEntry<'snippets'>['data']
> = {
  Name: 'name',
  Description: 'description',
  Category: 'category',
}

type Direction = 'asc' | 'desc'

const NEXT_DIRECTION: Record<Direction, Direction> = {
  asc: 'desc',
  desc: 'asc',
}

type State = {
  sortBy: (typeof HEADINGS)[number]
  sortDirection: Direction
}

const initialState: State = {
  sortBy: 'Name',
  sortDirection: 'asc',
}

type Action = { type: 'HEADING_CLICKED'; heading: (typeof HEADINGS)[number] }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'HEADING_CLICKED':
      if (state.sortBy === action.heading) {
        return {
          ...state,
          sortDirection: NEXT_DIRECTION[state.sortDirection],
        }
      }

      return { ...state, sortBy: action.heading, sortDirection: 'asc' }

    default:
      return state
  }
}

type Props = {
  snippets: CollectionEntry<'snippets'>[]
}

export function SnippetsTable({ snippets }: Props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { sortBy, sortDirection } = state

  const sortedSnippets = snippets.sort((a, b) => {
    const aValue = a.data[HEADING_TO_KEY[sortBy]]
    const bValue = b.data[HEADING_TO_KEY[sortBy]]

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * (sortDirection === 'asc' ? 1 : -1)
    }

    return 0
  })

  return (
    <table className="block border-collapse font-sans md:table md:border-4 md:border-gray-100 dark:md:border-gray-800">
      <thead className="hidden bg-gray-100 dark:bg-gray-800 md:table-header-group">
        <tr className="block md:table-row">
          {HEADINGS.map(heading => (
            <th
              key={heading}
              className="cursor-pointer p-4 text-lg hover:bg-black/5"
              onClick={() => dispatch({ type: 'HEADING_CLICKED', heading })}
            >
              {heading}
              {sortBy === heading && (
                <span className="text-sm"> ({sortDirection})</span>
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="flex flex-col gap-8 md:table-row-group md:text-lg">
        {sortedSnippets.map(entry => {
          const { category, description, name } = entry.data

          return (
            <tr key={entry.slug} className="block md:table-row">
              <td className="block border-gray-100 md:table-cell md:border-4 md:p-4 dark:md:border-gray-800">
                <a className="text-accent" href={`/snippets/${entry.slug}`}>
                  {name}
                </a>
              </td>

              <td className="block border-gray-100 md:table-cell md:border-4 md:p-4 dark:md:border-gray-800">
                <span className="font-sans text-lg font-bold md:hidden">
                  Description:{' '}
                </span>
                <span dangerouslySetInnerHTML={{ __html: description }} />
              </td>

              <td className="block border-gray-100 md:table-cell md:border-4 md:p-4 dark:md:border-gray-800">
                <span className="font-sans text-lg font-bold md:hidden">
                  Category:{' '}
                </span>
                <span dangerouslySetInnerHTML={{ __html: category }} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
