import React from 'react'
import { randomRGB } from '../../../utils'

export function Box() {
  return (
    <div
      className="h-16 rounded"
      style={{
        backgroundColor: randomRGB(),
      }}
    />
  )
}
