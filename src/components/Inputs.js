import React from 'react'
import { useSpacing } from '@kyleshevlin/layout'

export function Input({ label, value, onChange, type = 'text', ...rest }) {
  const bs = useSpacing()

  const paddingType = React.useMemo(() => {
    switch (type) {
      case 'range':
        return 0

      default:
        return `${bs(0.25)} ${bs(0.5)}`
    }
  }, [bs, type])

  return (
    <div>
      <label htmlFor={label}>
        <span css={{ marginRight: bs(0.5) }}>{label}</span>
        <input
          css={{
            backgroundColor: 'var(--components-inputs-background)',
            border: 'none',
            color: 'var(--components-inputs-text)',
            padding: paddingType,
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
