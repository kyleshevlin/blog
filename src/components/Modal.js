import React from 'react'
import ReactDOM from 'react-dom'
import { Flex, Margin } from '@kyleshevlin/layout'
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
    const currentElement = el.current
    portalRoot.appendChild(currentElement)

    return () => {
      portalRoot.removeChild(currentElement)
    }
  }, [])

  React.useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [closeButtonRef])

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
        <Margin bottom={1}>
          <Flex>
            <button
              aria-label="Close Modal"
              css={{
                backgroundColor: 'transparent',
                border: 'none',
                fontFamily: 'var(--fonts-secondary)',
                marginLeft: 'auto',
              }}
              onClick={onClick}
              ref={closeButtonRef}
            >
              {closeButtonText}
            </button>
          </Flex>
        </Margin>
      </Container>
      {children}
    </div>
  )

  return ReactDOM.createPortal(modal, el.current)
}
