import React from 'react'

const Close = ({ stroke, strokeWidth = 7, width }) => (
  <svg viewBox="0 0 64 64" width={width}>
    <g
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="square"
    >
      <path
        d="M5.5,5.5 L58.5,59.5 M5.5,58.5 L58.5,5.5"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </g>
  </svg>
)

export default Close
