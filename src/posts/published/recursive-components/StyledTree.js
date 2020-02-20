import React from 'react'
import TreeWrap from './TreeWrap'

function Tree({ items, depth = 0 }) {
  if (!items || !items.length) {
    return null
  }

  return items.map(item => (
    <React.Fragment key={item.name}>
      <div style={{ paddingLeft: depth * 15 }}>{item.name}</div>
      <Tree items={item.children} depth={depth + 1} />
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
