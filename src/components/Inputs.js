import React from 'react'
import { bs } from '../shevy'

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
            padding: `${bs(0.25)} ${bs(0.5)}`,
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

const useInputFactory = (formatter = x => x) => initialValue => {
  const [value, setValue] = React.useState(formatter(initialValue))

  const onChange = e => {
    setValue(formatter(e.target.value))
  }

  return [value, onChange, setValue]
}

export const useInput = useInputFactory()
export const useNumberInput = useInputFactory(Number)
