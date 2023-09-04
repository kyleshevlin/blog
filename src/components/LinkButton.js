import React from 'react'
import shevy from '../shevy'
import { getButtonStyles } from './Button'
import { useSpacing } from '@kyleshevlin/layout'

// TODO: Variants should live on the button itself
const VARIANTS = {
  default: spacing => getButtonStyles(spacing),
  bigWide: spacing => ({
    ...getButtonStyles(spacing),
    fontSize: shevy.h4.fontSize,
    padding: spacing(0.65),
    width: '100%',
  }),
  wide: spacing => ({ ...getButtonStyles(spacing), width: '100%' }),
}

export default function LinkButton({
  children,
  href,
  overrideStyles = {},
  variant = 'default',
}) {
  const bs = useSpacing()
  const styles = React.useMemo(() => VARIANTS[variant](bs), [bs, variant])

  return (
    <a css={{ ...styles, ...overrideStyles }} href={href}>
      {children}
    </a>
  )
}
