import React from 'react'

export default function Log({ value, replacer = null, space = 2 }) {
  return (
    <pre
      css={theme => ({
        backgroundColor: theme.colors.offset,
      })}
    >
      <code>{JSON.stringify(value, replacer, space)}</code>
    </pre>
  )
}
