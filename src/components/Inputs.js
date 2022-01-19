import React from 'react'
import { bs } from '../shevy'

function getPaddingForType(type) {
  switch (type) {
    case 'range':
      return 0

    default:
      return `${bs(0.25)} ${bs(0.5)}`
  }
}

export function Input({ label, value, onChange, type = 'text', ...rest }) {
  return (
    <div>
      <label htmlFor={label}>
        <span css={{ marginRight: bs(0.5) }}>{label}</span>
        <input
          css={{
            backgroundColor: 'var(--components-inputs-background)',
            border: 'none',
            color: 'var(--components-inputs-text)',
            padding: getPaddingForType(type),
          }}
          id={label}
          type={type}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </label>
    </div>
  )
}

const inputHooksFactory =
  (formatter = x => x) =>
  initialValue => {
    const [value, setValue] = React.useState(formatter(initialValue))

    const onChange = e => {
      setValue(formatter(e.target.value))
    }

    return [value, onChange, setValue]
  }

export const useInput = inputHooksFactory()
export const useNumberInput = inputHooksFactory(Number)
