import React from 'react'

type StringifyArgs = Parameters<typeof JSON.stringify>

type Args = {
  value: StringifyArgs[0]
  replacer?: StringifyArgs[1]
  space?: StringifyArgs[2]
}

export default function Log({ value, replacer = null, space = 2 }: Args) {
  return (
    <pre className="bg-gray-100 dark:bg-gray-800">
      <code>{JSON.stringify(value, replacer, space)}</code>
    </pre>
  )
}
