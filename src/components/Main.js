import React from 'react'
import { bs } from '../shevy'

export default function Main(props) {
  return (
    <main
      css={{
        paddingBottom: bs(2),
        minHeight: '65vh',
      }}
      role="main"
      {...props}
    />
  )
}
