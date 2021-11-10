import React from 'react'

export default function Flex({
  align: alignItems,
  children,
  direction: flexDirection,
  gap,
  justify: justifyContent,
  style = {},
  wrap: flexWrap,
}) {
  return (
    <div
      css={{
        ...style,
        alignItems,
        display: 'flex',
        flexDirection,
        flexWrap,
        gap,
        justifyContent,
      }}
    >
      {children}
    </div>
  )
}
