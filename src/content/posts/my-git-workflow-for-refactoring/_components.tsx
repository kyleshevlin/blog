import React from 'react'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  isSecondary?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const SHARED_STYLES = {
  borderRadius: 9999,
  fontFamily: 'sans-serif',
  padding: '0.35em 1em',
}

const PRIMARY_STYLES = { backgroundColor: 'blue', color: 'white' }
const SECONDARY_STYLES = { backgroundColor: 'lightGray', color: 'black' }

export function ExampleButton({
  children,
  onClick,
  isSecondary = false,
  type = 'button',
}: Props) {
  const variantStyles = isSecondary ? SECONDARY_STYLES : PRIMARY_STYLES

  return (
    <button
      onClick={onClick}
      style={{ ...SHARED_STYLES, ...variantStyles }}
      type={type}
    >
      {children}
    </button>
  )
}

/** WE CHANGED THIS ONE BELOW IF YOU'RE LOOKING AT THIS ON GITHUB */
type Variant = 'danger' | 'primary' | 'secondary'

const VARIANT_TO_STYLES: Record<Variant, React.CSSProperties> = {
  danger: { backgroundColor: 'red', color: 'white' },
  primary: PRIMARY_STYLES,
  secondary: SECONDARY_STYLES,
}

type PropsWithVariant = Pick<Props, 'children' | 'onClick' | 'type'> & {
  variant?: Variant
}

export function ExampleButtonWithVariant({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
}: PropsWithVariant) {
  const variantStyles = VARIANT_TO_STYLES[variant]

  return (
    <button
      onClick={onClick}
      style={{ ...SHARED_STYLES, ...variantStyles }}
      type={type}
    >
      {children}
    </button>
  )
}
