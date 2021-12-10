import React from 'react'
import shevy, { bs } from '../shevy'
import { buttonStyles } from './Button'

// TODO: Variants should live on the button itself
const VARIANTS = {
  default: buttonStyles,
  bigWide: {
    ...buttonStyles,
    fontSize: shevy.h4.fontSize,
    padding: bs(0.65),
    width: '100%',
  },
  wide: { ...buttonStyles, width: '100%' },
}

export default function LinkButton({
  children,
  href,
  overrideStyles = {},
  variant = 'default',
}) {
  const styles = VARIANTS[variant]

  return (
    <a css={{ ...styles, ...overrideStyles }} href={href}>
      {children}
    </a>
  )
}
