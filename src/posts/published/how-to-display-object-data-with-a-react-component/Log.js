import React from 'react'

export default function Log({ value, replacer = null, space = 2 }) {
  return (
    <pre
      css={{
        backgroundColor: 'var(--colors-offset)',
      }}
    >
      <code>{JSON.stringify(value, replacer, space)}</code>
    </pre>
  )
}
