import React from 'react'
import Button from '../../../components/Button'
import { useSpacing } from '@kyleshevlin/layout'

export default function CommonButton({
  children,
  onClick = () => {},
  primary,
  warning,
  danger,
}) {
  const bs = useSpacing()

  let backgroundColor = null
  if (primary) backgroundColor = '#17B890'
  if (warning) backgroundColor = '#FFD166'
  if (danger) backgroundColor = '#F0544F'

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
