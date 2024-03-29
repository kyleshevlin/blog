import React from 'react'
import type { Item } from './_types'

export default function UnstyledTree({ items }: { items?: Item[] }) {
  // our base case, if we have no items, render nothing.
  if (!items || !items.length) {
    return null
  }

  return items.map(item => (
    <React.Fragment key={item.name}>
      <div>{item.name}</div>
      <UnstyledTree items={item.children} />
    </React.Fragment>
  ))
}
