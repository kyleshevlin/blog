import React from 'react'
import { buttonStyles } from './Button'

export default function LinkButton({ children, href, overrideStyles = {} }) {
  return (
    <a css={{ ...buttonStyles, ...overrideStyles }} href={href}>
      {children}
    </a>
  )
}
