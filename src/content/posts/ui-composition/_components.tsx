import React from 'react'

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <Card.Wrap>
      <Card.Section>{children}</Card.Section>
    </Card.Wrap>
  )
}

Card.Wrap = function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[50ch] rounded border-2 border-gray-300 shadow-[8px_8px] shadow-accent dark:bg-gray-800">
      {children}
    </div>
  )
}

Card.Section = function Section({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>
}

Card.Divider = function Divider() {
  return <hr className="h-[2px] w-full bg-gray-300" />
}
