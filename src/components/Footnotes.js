import React, { useContext, useEffect, useReducer, useRef } from 'react'
import Container from './Container'
import { bs } from '../shevy'
import { COLORS, FONTS } from '../constants'
import { darken, lighten } from 'polished'

const initialState = {
  content: null,
  index: null,
  isVisible: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FOOTNOTE': {
      return {
        ...state,
        ...action.payload
      }
    }

    default:
      throw new Error(
        `The action.type ${
          action.type
        } was unaccounted for in FootnotesContainer.`
      )
  }
}

const FootnotesContext = React.createContext({
  ...initialState,
  updateFootnote: () => {}
})

export function FootnotesContainer({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <FootnotesContext.Provider
      value={{
        ...state,
        updateFootnote: payload => {
          dispatch({ type: 'UPDATE_FOOTNOTE', payload })
        }
      }}
    >
      {children}
    </FootnotesContext.Provider>
  )
}

export function FootnoteMarker({ index, content }) {
  const { index: contextIndex, isVisible, updateFootnote } = useContext(
    FootnotesContext
  )

  if (!index) {
    throw new Error('This marker needs an index defined')
  }

  if (!content) {
    throw new Error('Uhh, think you need some content.')
  }

  return (
    <button
      css={{
        display: 'inline-block',
        width: 20,
        height: 20,
        backgroundColor: COLORS.teal,
        color: COLORS.white,
        fontSize: '12px',
        fontFamily: FONTS.catamaran,
        lineHeight: 0,
        border: 'none',
        borderRadius: '50%',
        position: 'relative',
        top: '-2px',
        transition: 'background-color .3s ease',

        '&:hover': {
          backgroundColor: lighten(0.1, COLORS.teal)
        },

        '&:focus': {
          outline: 'none',
          boxShadow: `0 0 3px 1px ${darken(0.15, COLORS.teal)}`
        }
      }}
      onClick={() => {
        updateFootnote({
          content,
          index,
          // If the user clicks the same marker, close the footnote
          isVisible: isVisible && index === contextIndex ? false : true
        })
      }}
    >
      <span css={{ position: 'relative', top: '-1px' }}>{index}</span>
    </button>
  )
}

export function FootnoteDisplay() {
  const displayElement = useRef(null)
  const { content, index, isVisible, updateFootnote } = useContext(
    FootnotesContext
  )
  useFootnoteDisplayEvents(displayElement)

  return isVisible ? (
    <div
      ref={displayElement}
      css={{
        width: '100%',
        backgroundColor: COLORS.white,
        position: 'fixed',
        bottom: 0,
        borderTop: `4px solid ${COLORS.teal}`,
        boxShadow: '0 -4px 6px rgba(0, 0, 0, .15)',
        paddingTop: bs(),
        paddingBottom: bs(2)
      }}
    >
      <Container>
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: bs(1)
          }}
        >
          <div
            css={{
              display: 'inline-block',
              width: 20,
              height: 20,
              backgroundColor: COLORS.teal,
              color: COLORS.white,
              fontSize: '12px',
              fontFamily: FONTS.catamaran,
              lineHeight: 1,
              border: 'none',
              borderRadius: '50%',
              textAlign: 'center'
            }}
          >
            <span css={{ position: 'relative', top: 2 }}>{index}</span>
          </div>
          <button
            css={{
              display: 'inline-block',
              backgroundColor: COLORS.teal,
              color: COLORS.white,
              fontFamily: FONTS.catamaran,
              fontSize: '.75em',
              textTransform: 'uppercase',
              lineHeight: 1,
              padding: `${bs(0.25)} ${bs(0.5)}`,
              border: 'none',
              borderRadius: '4px',
              transition: 'background-color .3s ease',

              '&:hover': {
                backgroundColor: lighten(0.1, COLORS.teal)
              }
            }}
            onClick={() => {
              updateFootnote(initialState)
            }}
          >
            <span css={{ position: 'relative', top: '-1px' }}>Close</span>
          </button>
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </div>
  ) : null
}

function useFootnoteDisplayEvents(markerRef) {
  const { isVisible, updateFootnote } = useContext(FootnotesContext)

  useEffect(
    () => {
      function handleOutsideClick(e) {
        if (!isVisible) {
          return
        }

        if (markerRef.current && !markerRef.current.contains(e.target)) {
          updateFootnote({ isVisible: false })
        }
      }

      function handleEscKey(e) {
        if (e.key === 'Escape') {
          updateFootnote({ isVisible: false })
        }
      }

      document.addEventListener('click', handleOutsideClick)
      document.addEventListener('keydown', handleEscKey)

      return () => {
        document.removeEventListener('click', handleOutsideClick)
        document.removeEventListener('keydown', handleEscKey)
      }
    },
    [isVisible, markerRef, updateFootnote]
  )
}
