import React from 'react'

type InputProps = {
  label: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  type?: HTMLInputElement['type']
  value: string | number
  variant?: 'inline' | 'block'
  [key: string]: unknown
}

export function Input({
  label,
  onChange,
  type = 'text',
  value,
  variant = 'inline',
  ...rest
}: InputProps) {
  return (
    <label
      className={`flex gap-2 ${variant === 'block' ? 'flex-col items-start' : 'items-baseline'}`}
      htmlFor={label}
    >
      <span className="font-sans font-bold">{label}</span>
      <input
        {...rest}
        className={`${type !== 'range' && 'px-2 py-1'} rounded bg-white font-serif text-black`}
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
