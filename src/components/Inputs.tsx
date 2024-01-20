import React from 'react'

type InputProps = {
  label: string
  value: string | number
  onChange: React.ChangeEventHandler<HTMLInputElement>
  type?: HTMLInputElement['type']
  variant?: 'inline' | 'block'
  [key: string]: unknown
}

export function Input({
  label,
  value,
  onChange,
  type = 'text',
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
        className={`${type !== 'range' && 'px-2 py-1'} rounded bg-white font-serif text-black`}
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </label>
  )
}

export const useInput = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue)

  const onChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(e => {
    setValue(e.target.value)
  }, [])

  return [value, onChange, setValue] as const
}

export const useNumberInput = (initialValue: string | number) => {
  const [value, setValue] = React.useState(Number(initialValue))

  const onChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(e => {
    setValue(Number(e.target.value))
  }, [])

  return [value, onChange, setValue] as const
}
