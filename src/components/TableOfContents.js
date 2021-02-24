import React from 'react'
import { Link } from 'gatsby'
import { bs } from '../shevy'

export default function TableOfContents({ baseUrl, contents }) {
  if (!contents.items) return null

  return (
    <div
      css={{
        fontFamily: 'var(--fonts-catamaran)',
      }}
    >
      <div css={{ marginBottom: bs(0.5) }}>Table of Contents</div>
      <Items baseUrl={baseUrl} items={contents.items} />
    </div>
  )
}

function Items({ baseUrl, depth = 0, items }) {
  if (!items) return null

  return items.map(item => {
    const { items: subItems, title, url } = item

    return (
      <React.Fragment key={url}>
        <div style={{ marginLeft: bs(depth * 0.5), marginBottom: bs(0.5) }}>
          <Link to={baseUrl + url}>{title}</Link>
        </div>
        <Items baseUrl={baseUrl} depth={depth + 1} items={subItems} />
      </React.Fragment>
    )
  })
}
