import React from 'react'
import ReactDOM from 'react-dom'
import { bs } from '../shevy'
import Container from './Container'

export default function Modal({
  ariaLabel,
  children,
  closeButtonRef,
  closeButtonText,
  onClick,
}) {
  const el = React.useRef(document.createElement('div'))

  React.useEffect(() => {
    const portalRoot = document.getElementById('portal')
    portalRoot.appendChild(el.current)

    return () => {
      portalRoot.removeChild(el.current)
    }
  }, [])

  React.useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [])

  const modal = (
    <div
      aria-label={ariaLabel}
      aria-modal
      css={{
        // TODO: transparentize
        backgroundColor: 'var(--colors-background)',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        paddingTop: bs(),
        paddingBottom: bs(),
      }}
      role="dialog"
      tabIndex={-1}
    >
      <Container>
        <div css={{ display: 'flex', marginBottom: bs() }}>
          <button
            aria-label="Close Modal"
            css={{
              backgroundColor: 'transparent',
              border: 'none',
              fontFamily: 'var(--fonts-catamaran)',
              marginLeft: 'auto',
            }}
            onClick={onClick}
            ref={closeButtonRef}
          >
            {closeButtonText}
          </button>
        </div>
      </Container>
      {children}
    </div>
  )

  return ReactDOM.createPortal(modal, el.current)
}
