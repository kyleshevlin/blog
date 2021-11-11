import React from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../components/Seo'
import { bs } from '../shevy'
import { mq, getNodes } from '../utils'
import { Machine } from 'xstate'
import { useMachine } from '@xstate/react'
import Content from '../components/Content'

const sortsMachine = Machine({
  id: 'sorts',
  initial: 'nameAsc',
  states: {
    nameAsc: {
      on: {
        CLICK_NAME: 'nameDesc',
        CLICK_CATEGORY: 'categoryAsc',
      },
    },
    nameDesc: {
      on: {
        CLICK_NAME: 'nameAsc',
        CLICK_CATEGORY: 'categoryAsc',
      },
    },
    categoryAsc: {
      on: {
        CLICK_NAME: 'nameAsc',
        CLICK_CATEGORY: 'categoryDesc',
      },
    },
    categoryDesc: {
      on: {
        CLICK_NAME: 'nameAsc',
        CLICK_CATEGORY: 'categoryAsc',
      },
    },
  },
})

const comparators = {
  nameAsc: (a, b) => {
    a = a.frontmatter.name.toLowerCase()
    b = b.frontmatter.name.toLowerCase()

    if (a < b) return -1
    if (a > b) return 1
    return 0
  },
  nameDesc: (a, b) => {
    a = a.frontmatter.name.toLowerCase()
    b = b.frontmatter.name.toLowerCase()

    if (a > b) return -1
    if (a < b) return 1
    return 0
  },
  categoryAsc: (a, b) => {
    a = a.frontmatter.category.toLowerCase()
    b = b.frontmatter.category.toLowerCase()

    if (a < b) return -1
    if (a > b) return 1
    return 0
  },
  categoryDesc: (a, b) => {
    a = a.frontmatter.category.toLowerCase()
    b = b.frontmatter.category.toLowerCase()

    if (a > b) return -1
    if (a < b) return 1
    return 0
  },
}

const safeSort = comparator => array => [...array].sort(comparator)

function JoshLink() {
  return (
    <a href="https://www.joshwcomeau.com/snippets/">Josh W. Comeau's blog</a>
  )
}

export default function Snippets({ data }) {
  const [state, send] = useMachine(sortsMachine)
  const comparator = comparators[state.value]
  const snippets = getNodes(data.snippets)
  const sortedSnippets = safeSort(comparator)(snippets)

  return (
    <>
      <Seo title="Snippets" keywords={['Snippets', 'Kyle Shevlin']} />

      <Content>
        <h1>Snippets</h1>

        <p>
          Inspired by <JoshLink />, this is a collection of my code snippets
          that you can look at for inspiration or copy/paste at will.
        </p>

        {snippets.length ? (
          <table
            css={{
              border: 'none',
              display: 'block',
              marginTop: bs(2),
              marginBottom: 0,

              [mq.bravo]: {
                display: 'table',
                borderCollapse: 'collapse',
                width: '100%',
              },
            }}
          >
            <thead
              css={{
                display: 'none',

                [mq.bravo]: {
                  display: 'table-header-group',
                },
              }}
            >
              <Row>
                <HeadingCell onClick={() => send('CLICK_NAME')}>
                  <span>Name</span>
                  {state.matches('nameAsc') && <Arrow />}
                  {state.matches('nameDesc') && <Arrow flip />}
                </HeadingCell>
                <HeadingCell>Description</HeadingCell>
                <HeadingCell onClick={() => send('CLICK_CATEGORY')}>
                  <span>Category</span>
                  {state.matches('categoryAsc') && <Arrow />}
                  {state.matches('categoryDesc') && <Arrow flip />}
                </HeadingCell>
              </Row>
            </thead>
            <tbody css={{ display: 'table-row-group' }}>
              {sortedSnippets.map(snippet => {
                const { id, frontmatter } = snippet
                const { category, description, name, slug } = frontmatter

                return (
                  <Row key={id}>
                    <Cell>
                      <Link to={`/snippets/${slug}`}>{name}</Link>
                    </Cell>
                    <Cell>
                      <Label>Description: </Label>
                      <div dangerouslySetInnerHTML={{ __html: description }} />
                    </Cell>
                    <Cell>
                      <Label>Category: </Label>
                      {category}
                    </Cell>
                  </Row>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div>No snippets yet! Working on collecting them!</div>
        )}
      </Content>
    </>
  )
}

function Row({ children }) {
  return (
    <tr
      css={{
        display: 'block',
        marginBottom: bs(1.5),

        [mq.bravo]: {
          display: 'table-row',
          marginBottom: 0,
        },
      }}
    >
      {children}
    </tr>
  )
}

function Cell({ children }) {
  return (
    <td
      css={{
        border: 'none',
        display: 'block',
        padding: 0,
        marginBottom: bs(0.25),

        [mq.bravo]: {
          border: '4px solid var(--colors-offset)',
          display: 'table-cell',
          padding: bs(0.75),
          marginBottom: 0,
        },
      }}
    >
      {children}
    </td>
  )
}

function HeadingCell({ children, onClick }) {
  const clickableProps = onClick ? { onClick, role: 'button' } : {}

  return (
    <th
      css={{
        fontFamily: 'var(--fonts-catamaran)',
        fontWeight: 'bold',
        cursor: onClick ? 'pointer' : 'default',

        [mq.bravo]: {
          display: 'table-cell',
          padding: `${bs(0.5)} ${bs(0.5)}`,
          textAlign: 'left',
        },
      }}
      {...clickableProps}
    >
      {children}
    </th>
  )
}

function Label({ children }) {
  return (
    <span
      css={{
        fontFamily: 'var(--fonts-catamaran)',
        fontWeight: 'bold',
        [mq.bravo]: {
          display: 'none',
        },
      }}
    >
      {children}
    </span>
  )
}

function Arrow({ width = 8, flip = false }) {
  const height = width

  const path = flip ? 'M0,15 15,15 8,0Z' : 'M0,0, 15,0, 8,15Z'

  return (
    <span css={{ marginLeft: bs(0.25) }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 15 15"
        fill="currentColor"
      >
        <path d={path} />
      </svg>
    </span>
  )
}

export const query = graphql`
  query AllSnippets {
    snippets: allMdx(
      filter: { fileAbsolutePath: { regex: "/snippets/" } }
      sort: { order: ASC, fields: frontmatter___name }
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            category
            description
            slug
          }
        }
      }
    }
  }
`
