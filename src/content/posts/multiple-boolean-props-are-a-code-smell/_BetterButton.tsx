import React from 'react'
import { Button } from '../../../components/Button'

const BUTTON_BGS = {
  default: '',
  primary: 'bg-green-500 hover:bg-green-500',
  warning: 'bg-yellow-500 hover:bg-yellow-500',
  danger: 'bg-red-500 hover:bg-red-500',
} as const

export default function BetterButton({
  children,
  onClick = () => {},
  variant = 'default',
}: {
  children: React.ReactNode
  onClick?: React.ComponentProps<typeof Button>['onClick']
  variant?: keyof typeof BUTTON_BGS
}) {
  const backgroundColor = BUTTON_BGS[variant] || BUTTON_BGS.default

  return (
    <Button onClick={onClick} className={backgroundColor}>
      {children}
    </Button>
  )
}
