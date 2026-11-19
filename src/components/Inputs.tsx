import React from 'react'

type InputProps = {
  helperText?: string
  label: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  type?: HTMLInputElement['type']
  value: string | number
  variant?: 'inline' | 'block'
  [key: string]: unknown
}

export function Input({
  helperText,
  label,
  onChange,
  type = 'text',
  value,
  variant = 'inline',
  ...rest
}: InputProps) {
  return (
    <label
      className={`flex gap-2 ${variant === 'block' ? 'flex-col' : 'items-baseline'}`}
      htmlFor={label}
    >
      <span className="flex flex-col font-sans">
        <span className="font-bold">{label}</span>

        {helperText && (
          <span className="text-sm text-gray-500 dark:text-gray-300">
            {helperText}
          </span>
        )}
      </span>
      <input
        {...rest}
        className={`${type !== 'range' && 'px-2 py-1'} rounded border-2 border-gray-300 bg-white font-serif text-black`}
        id={label}
        onChange={onChange}
        type={type}
        value={value}
      />
    </label>
  )
}

export const useInput = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue)

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    [],
  )

  return [value, onChange, setValue] as const
}

export const useNumberInput = (initialValue: string | number) => {
  const [value, setValue] = React.useState(Number(initialValue))

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value))
    },
    [],
  )

  return [value, onChange, setValue] as const
}
