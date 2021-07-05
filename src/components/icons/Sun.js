import React from 'react'

const SIZE = 18
const RAY_SIZE = SIZE / 6

export default function Sun({ size = SIZE }) {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} height={size} width={size}>
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={SIZE / 3 - 1}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      />
      <g>
        <line
          x1={SIZE / 2}
          y1="0"
          x2={SIZE / 2}
          y2={RAY_SIZE}
          stroke="currentColor"
          strokeWidth={2}
        />
        <line
          x1="0"
          y1={SIZE / 2}
          x2={RAY_SIZE}
          y2={SIZE / 2}
          stroke="currentColor"
          strokeWidth={2}
        />
        <line
          x1={SIZE / 2}
          y1={SIZE}
          x2={SIZE / 2}
          y2={SIZE - RAY_SIZE}
          stroke="currentColor"
          strokeWidth={2}
        />
        <line
          x1={SIZE}
          y1={SIZE / 2}
          x2={SIZE - RAY_SIZE}
          y2={SIZE / 2}
          stroke="currentColor"
          strokeWidth={2}
        />
      </g>
      <g style={{ transform: 'rotate(45deg)', transformOrigin: 'center' }}>
        <line
          x1={SIZE / 2}
          y1="0"
          x2={SIZE / 2}
          y2={RAY_SIZE}
          stroke="currentColor"
          strokeWidth={2}
        />
        <line
          x1="0"
          y1={SIZE / 2}
          x2={RAY_SIZE}
          y2={SIZE / 2}
          stroke="currentColor"
          strokeWidth={2}
        />
        <line
          x1={SIZE / 2}
          y1={SIZE}
          x2={SIZE / 2}
          y2={SIZE - RAY_SIZE}
          stroke="currentColor"
          strokeWidth={2}
        />
        <line
          x1={SIZE}
          y1={SIZE / 2}
          x2={SIZE - RAY_SIZE}
          y2={SIZE / 2}
          stroke="currentColor"
          strokeWidth={2}
        />
      </g>
    </svg>
  )
}
