import React from 'react'
import { v } from '../../../utils'

export default function Log({ value, replacer = null, space = 2 }) {
  return (
    <pre
      css={{
        backgroundColor: v('colors-offset'),
      }}
    >
      <code>{JSON.stringify(value, replacer, space)}</code>
    </pre>
  )
}
