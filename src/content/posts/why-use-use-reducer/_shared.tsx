import React from 'react'

export function Wrap({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center gap-4">{children}</div>
}

export function Canvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded border-2 border-gray-300 dark:border-gray-700">
      {children}
    </div>
  )
}

export function Ball({ position }: { position: number }) {
  return (
    <div
      className="absolute left-1/2 h-[20px] w-[20px] -translate-x-1/2 rounded-full bg-accent"
      style={{
        bottom: position,
      }}
    />
  )
}
