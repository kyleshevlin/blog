import React from 'react'
import { Button } from '../../../components/Button'
import { useSpacing } from '@kyleshevlin/layout'

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
  const bs = useSpacing()
  const backgroundColor = BUTTON_BGS[variant] || BUTTON_BGS.default

  const styles = {
    marginRight: bs(1),
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
