import React from 'react'
import TreeWrap from './TreeWrap'
import { bs } from '../../../shevy'
import { FONTS } from '../../../constants'

function ClosedFolder() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M6.083 4c1.38 1.612 2.578 3 4.917 3h11v13h-20v-16h4.083zm.917-2h-7v20h24v-17h-13c-1.629 0-2.305-1.058-4-3z" />
    </svg>
  )
}

function OpenFolder() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M0 10v12h24v-12h-24zm22 10h-20v-8h20v8zm-22-12v-6h7c1.695 1.942 2.371 3 4 3h13v3h-2v-1h-11c-2.34 0-3.537-1.388-4.916-3h-4.084v4h-2z" />
    </svg>
  )
}

function Tree({ items, depth = 0 }) {
  if (!items || !items.length) {
    return null
  }

  return items.map(item => {
    const { children, name } = item

    const folder =
      children && children.length ? <OpenFolder /> : <ClosedFolder />

    return (
      <React.Fragment key={name}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontFamily: FONTS.catamaran,
            paddingLeft: depth * 15
          }}
        >
          {folder}
          <span style={{ display: 'inline-block', padding: bs(0.25) }}>
            {name}
          </span>
        </div>
        <Tree items={children} depth={depth + 1} />
      </React.Fragment>
    )
  })
}

export default function WrappedTree({ items }) {
  return (
    <TreeWrap>
      <Tree items={items} />
    </TreeWrap>
  )
}
