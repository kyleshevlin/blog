import React from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'
import { bs } from '../shevy'
import { BREAKPOINTS } from '../constants'
import { mq, getNodes, v } from '../utils'

export default function Snippets({ data }) {
  const snippets = getNodes(data.snippets)
  const joshLink = (
    <a href="https://www.joshwcomeau.com/snippets/">Josh W. Comeau's blog</a>
  )

  return (
    <>
      <Seo title="Snippets" keywords={['Snippets', 'Kyle Shevlin']} />
      <h1>Snippets</h1>

      <p>
        Inspired by {joshLink}, this is a collection of my code snippets that
        you can look at for inspiration or copy/paste at will.
      </p>

      {snippets.length ? (
        <table
          css={{
            border: 'none',
            display: 'block',
            marginTop: bs(2),
            marginBottom: bs(2),

            [mq(BREAKPOINTS.bravo)]: {
              display: 'table',
              borderCollapse: 'collapse',
              width: '100%',
            },
          }}
        >
          <thead
            css={{
              display: 'none',

              [mq(BREAKPOINTS.bravo)]: {
                display: 'table-header-group',
              },
            }}
          >
            <Row>
              <HeadingCell>Name</HeadingCell>
              <HeadingCell>Description</HeadingCell>
              <HeadingCell>Category</HeadingCell>
            </Row>
          </thead>
          <tbody css={{ display: 'table-row-group' }}>
            {snippets.map(snippet => {
              const { id, frontmatter } = snippet
              const { category, description, name, slug } = frontmatter

              return (
                <Row key={id}>
                  <Cell>
                    <Link to={`/snippets/${slug}`}>{name}</Link>
                  </Cell>
                  <Cell>
                    <Label>Description: </Label>
                    {description}
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

      <AddedValue />
    </>
  )
}

function Row({ children }) {
  return (
    <tr
      css={{
        display: 'block',
        marginBottom: bs(1.5),

        [mq(BREAKPOINTS.bravo)]: {
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

        [mq(BREAKPOINTS.bravo)]: {
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

function HeadingCell({ children }) {
  return (
    <th
      css={{
        fontFamily: v('fonts-catamaran'),
        fontWeight: 'bold',

        [mq(BREAKPOINTS.bravo)]: {
          display: 'table-cell',
          padding: `${bs(0.5)} ${bs(0.75)}`,
          textAlign: 'left',
        },
      }}
    >
      {children}
    </th>
  )
}

function Label({ children }) {
  return (
    <span
      css={{
        fontFamily: v('fonts-catamaran'),
        fontWeight: 'bold',
        [mq(BREAKPOINTS.bravo)]: {
          display: 'none',
        },
      }}
    >
      {children}
    </span>
  )
}

export const query = graphql`
  query AllSnippets {
    snippets: allMdx(
      filter: { fileAbsolutePath: { regex: "/snippets/" } }
      sort: { order: ASC, fields: id }
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
