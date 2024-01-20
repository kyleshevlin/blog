import React from 'react'
import { Button } from '../../../components/Button'

export default function CommonButton({
  children,
  onClick = () => {},
  primary = false,
  warning = false,
  danger = false,
}: {
  children: React.ReactNode
  onClick?: React.ComponentProps<typeof Button>['onClick']
  primary?: boolean
  warning?: boolean
  danger?: boolean
}) {
  let backgroundColor = ''
  if (primary) backgroundColor = 'bg-green-500 hover:bg-green-500'
  if (warning) backgroundColor = 'bg-yellow-500 hover:bg-yellow-500'
  if (danger) backgroundColor = 'bg-red-500 hover:bg-red-500'

  return (
    <Button onClick={onClick} className={backgroundColor}>
      {children}
    </Button>
  )
}
