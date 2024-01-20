import React from 'react'

export const ITEMS = [
  { value: 'Tab 1', content: 'Hello there' },
  { value: 'Tab 2', content: 'How are you?' },
  { value: 'Tab 3', content: 'Good to hear' },
]

export function TabsWrap({ children }: { children: React.ReactNode }) {
  return <div className="font-sans">{children}</div>
}

export function TabsTriggerInner({
  children,
  isSelected = false,
}: {
  children: React.ReactNode
  isSelected: boolean
}) {
  return (
    <div
      className={`${isSelected ? 'bg-accent text-white' : 'bg-white dark:bg-gray-800'} px-4 py-2`}
    >
      {children}
    </div>
  )
}

export function TabsContentWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="grow border-2 border-black p-6 dark:border-gray-700 dark:bg-gray-800">
      {children}
    </div>
  )
}
