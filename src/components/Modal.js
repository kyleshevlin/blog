import React from 'react'
import ReactDOM from 'react-dom'
import { transparentize } from 'polished'
import { COLORS } from '../constants'

export default function Modal({ children }) {
  const el = React.useRef(document.createElement('div'))

  React.useEffect(() => {
    const portalRoot = document.getElementById('portal')
    portalRoot.appendChild(el.current)

    return () => {
      portalRoot.removeChild(el.current)
    }
  }, [])

  return ReactDOM.createPortal(
    <div
      css={{
        backgroundColor: transparentize(0.05, COLORS.white),
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }}
    >
      {children}
    </div>,
    el.current
  )
}
