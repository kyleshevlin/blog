import React from 'react'

export default function Log({ value, replacer = null, space = 2 }) {
  return (
    <pre className="bg-gray-100 dark:bg-gray-800">
      <code>{JSON.stringify(value, replacer, space)}</code>
    </pre>
  )
}
