import React from 'react'
import { buttonStyles } from './Button'

export default function LinkButton({ children, href }) {
  return (
    <a css={buttonStyles} href={href}>
      {children}
    </a>
  )
}
