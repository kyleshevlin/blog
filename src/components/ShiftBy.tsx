type Props = {
  children: React.ReactNode
  x?: number
  y?: number
}

export function ShiftBy({ x = 0, y = 0, children }: Props) {
  return (
    <div
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {children}
    </div>
  )
}
