import React from 'react'

const Search = ({ stroke, strokeWidth = 6, width }) => (
  <svg viewBox="0 0 64 64" width={width}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M25.3969696,39.1611652 C33.4027176,47.1669132 46.3825997,47.1669132 54.3883476,39.1611652 C62.3940956,31.1554173 62.3940956,18.1755352 54.3883476,10.1697872 C46.3825997,2.16403923 33.4027176,2.16403923 25.3969696,10.1697872 C17.3912216,18.1755352 17.3912216,31.1554173 25.3969696,39.1611652 Z M26,40 L4.39265863,60.1654762"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </g>
  </svg>
)

export default Search
