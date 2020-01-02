import React from 'react'
import { COLORS } from '../../../constants'

export default function Log({ value, replacer = null, space = 2 }) {
  return (
    <pre
      css={{
        backgroundColor: COLORS.lightGray
      }}
    >
      <code>{JSON.stringify(value, replacer, space)}</code>
    </pre>
  )
}
