import React from 'react'
import { Link, graphql } from 'gatsby'
import Seo from '../components/Seo'
import AddedValue from '../components/AddedValue'
import { bs } from '../shevy'
import { BREAKPOINTS } from '../constants'
import { createMediaQuery, getNodes, v } from '../utils'

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
        <div
          css={{
            marginTop: bs(2),
            marginBottom: bs(2),

            [createMediaQuery(BREAKPOINTS.bravo)]: {
              borderCollapse: 'collapse',
              display: 'table',
              width: '100%',
            },
          }}
        >
          <Row>
            <Cell>
              <Heading>Name</Heading>
            </Cell>
            <Cell>
              <Heading>Description</Heading>
            </Cell>
            <Cell>
              <Heading>Category</Heading>
            </Cell>
          </Row>
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
        </div>
      ) : (
        <div>No snippets yet! Working on collecting them!</div>
      )}

      <AddedValue />
    </>
  )
}

function Row({ children }) {
  return (
    <div
      css={{
        marginBottom: bs(1.5),
        [createMediaQuery(BREAKPOINTS.bravo)]: {
          display: 'table-row',
          marginBottom: 0,
        },
      }}
    >
      {children}
    </div>
  )
}

function Cell({ children }) {
  return (
    <div
      css={{
        marginBottom: bs(0.25),
        [createMediaQuery(BREAKPOINTS.bravo)]: {
          border: '4px solid var(--colors-offset)',
          display: 'table-cell',
          padding: bs(0.75),
          marginBottom: 0,
        },
      }}
    >
      {children}
    </div>
  )
}

function Heading({ children }) {
  return (
    <span
      css={{
        display: 'none',
        fontFamily: v('fonts-catamaran'),
        fontWeight: 'bold',
        [createMediaQuery(BREAKPOINTS.bravo)]: {
          display: 'inline-block',
        },
      }}
    >
      {children}
    </span>
  )
}

function Label({ children }) {
  return (
    <span
      css={{
        fontFamily: v('fonts-catamaran'),
        fontWeight: 'bold',
        [createMediaQuery(BREAKPOINTS.bravo)]: {
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
    snippets: allMdx(filter: { fileAbsolutePath: { regex: "/snippets/" } }) {
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
