import React from 'react'
import { buttonStyles } from './Button'
import { bs } from '../shevy'

const linkButtonStyles = theme => ({
  ...buttonStyles(theme),
  paddingTop: bs(0.125),
  paddingBottom: bs(0.125),
})

export default function LinkButton({ children, href }) {
  return (
    <a css={linkButtonStyles} href={href}>
      {children}
    </a>
  )
}
