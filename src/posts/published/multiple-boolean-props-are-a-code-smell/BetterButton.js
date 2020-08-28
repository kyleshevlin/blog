import React from 'react'
import Button from '../../../components/Button'
import { bs } from '../../../shevy'

const BUTTON_BGS = {
  default: null,
  primary: '#17b890',
  warning: '#ffd166',
  danger: '#f0544f',
}

export default function BetterButton({
  children,
  onClick = () => {},
  variant = 'default',
}) {
  let backgroundColor = BUTTON_BGS[variant] || BUTTON_BGS.default

  const styles = {
    marginRight: bs(),
  }

  if (backgroundColor) {
    styles.backgroundColor = backgroundColor
    styles['&:hover'] = { backgroundColor }
  }

  return (
    <Button onClick={onClick} style={styles}>
      {children}
    </Button>
  )
}
