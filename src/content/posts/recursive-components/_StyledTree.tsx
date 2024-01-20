import React from 'react'
import type { Item } from './_types'

export default function StyledTree({
  items,
  depth = 0,
}: {
  items?: Item[]
  depth?: number
}) {
  if (!items || !items.length) {
    return null
  }

  return items.map(item => (
    <React.Fragment key={item.name}>
      <div style={{ paddingLeft: depth * 15 }}>{item.name}</div>
      <StyledTree items={item.children} depth={depth + 1} />
    </React.Fragment>
  ))
}
