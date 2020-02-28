import React from 'react'
import TreeWrap from './TreeWrap'

function Tree({ items }) {
  // our base case, if we have no items, render nothing.
  if (!items || !items.length) {
    return null
  }

  return items.map(item => (
    <React.Fragment key={item.name}>
      <div>{item.name}</div>
      <Tree items={item.children} />
    </React.Fragment>
  ))
}

export default function WrappedTree({ items }) {
  return (
    <TreeWrap>
      <Tree items={items} />
    </TreeWrap>
  )
}
