import React from 'react'

import { bs } from '../../../shevy'

export const ITEMS = [
  { value: 'Tab 1', content: 'Hello there' },
  { value: 'Tab 2', content: 'How are you?' },
  { value: 'Tab 3', content: 'Good to hear' },
]

export const SHARED_BORDER = '2px solid var(--colors-text)'

export function TabsWrap({ children }) {
  return <div css={{ fontFamily: 'var(--fonts-secondary)' }}>{children}</div>
}

export function TabsTriggerInner({ children, isSelected }) {
  return (
    <div
      css={{
        backgroundColor: isSelected ? 'var(--colors-accent)' : 'transparent',
        border: 'none',
        color: isSelected
          ? 'var(--colors-text-on-accent)'
          : 'var(--colors-text)',
        padding: `${bs(0.25)} ${bs(0.75)}`,
      }}
    >
      {children}
    </div>
  )
}

export function TabsContentWrap({ children }) {
  return (
    <div
      css={{
        border: SHARED_BORDER,
        padding: bs(),
        flexGrow: 1,
      }}
    >
      {children}
    </div>
  )
}
