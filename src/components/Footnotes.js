import React, { useContext, useEffect, useReducer, useRef } from 'react'
import Button, { buttonStyles } from './Button'
import Container from './Container'
import { bs } from '../shevy'
import { darken } from 'polished'

const initialState = {
  content: null,
  index: null,
  isVisible: false,
  markers: {},
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MARKER': {
      const length = Object.keys(state.markers).length

      return {
        ...state,
        markers: {
          ...state.markers,
          [action.payload]: length + 1,
        },
      }
    }

    case 'REMOVE_MARKER': {
      const markersClone = { ...state.markers }
      delete markersClone[action.payload]

      return {
        ...state,
        markers: markersClone,
      }
    }

    case 'HIDE_FOOTNOTE': {
      return {
        ...state,
        isVisible: false,
      }
    }

    case 'UPDATE_FOOTNOTE': {
      return {
        ...state,
        ...action.payload,
      }
    }

    default:
      throw new Error(
        `The action.type ${action.type} was unaccounted for in FootnotesProvider.`
      )
  }
}

const FootnotesContext = React.createContext()

export function FootnotesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addMarker = payload => {
    dispatch({ type: 'ADD_MARKER', payload })
  }

  const removeMarker = payload => {
    dispatch({ type: 'REMOVE_MARKER', payload })
  }

  const updateFootnote = payload => {
    dispatch({ type: 'UPDATE_FOOTNOTE', payload })
  }

  const hideFootnote = () => {
    dispatch({ type: 'HIDE_FOOTNOTE' })
  }

  return (
    <FootnotesContext.Provider
      value={{
        ...state,
        addMarker,
        removeMarker,
        hideFootnote,
        updateFootnote,
      }}
    >
      {children}
    </FootnotesContext.Provider>
  )
}

const markerStyles = theme => ({
  ...buttonStyles(theme),
  width: 20,
  height: 20,
  fontSize: 12,
  lineHeight: 0,
  padding: 0,
  borderRadius: '50%',
  position: 'relative',
  top: '-2px',

  '&:focus': {
    outline: 'none',
    boxShadow: `0 0 3px 1px ${darken(0.15, theme.colors.accent)}`,
  },
})

export function FootnoteMarker({ content }) {
  const {
    addMarker,
    index: contextIndex,
    isVisible,
    markers,
    removeMarker,
    updateFootnote,
  } = useContext(FootnotesContext)
  const index = markers[content]

  if (!content) {
    throw new Error('Uhh, think you need some content.')
  }

  React.useEffect(() => {
    addMarker(content)

    return () => {
      removeMarker(content)
    }
  }, [])

  return (
    <button
      css={markerStyles}
      onClick={() => {
        updateFootnote({
          content,
          index,
          // If the user clicks the same marker, close the footnote
          isVisible: isVisible && index === contextIndex ? false : true,
        })
      }}
    >
      <span css={{ position: 'relative', top: '-1px' }}>{index}</span>
    </button>
  )
}

const displayMarkerStyles = theme => ({
  ...markerStyles(theme),
  lineHeight: 1,
  textAlign: 'center',
})

export function FootnoteDisplay() {
  const displayElement = useRef(null)
  const { content, hideFootnote, index, isVisible } = useContext(
    FootnotesContext
  )
  useFootnoteDisplayEvents(displayElement)

  return isVisible ? (
    <div
      ref={displayElement}
      css={theme => ({
        width: '100%',
        backgroundColor: theme.colors.background,
        position: 'fixed',
        bottom: 0,
        borderTop: `4px solid ${theme.colors.accent}`,
        boxShadow: '0 -4px 6px rgba(0, 0, 0, .15)',
        paddingTop: bs(),
        paddingBottom: bs(2),
        zIndex: 1,
      })}
    >
      <Container>
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: bs(1),
          }}
        >
          <div css={displayMarkerStyles}>
            <span css={{ position: 'relative', top: 2 }}>{index}</span>
          </div>
          <Button onClick={hideFootnote}>Close</Button>
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </div>
  ) : null
}

function useFootnoteDisplayEvents(markerRef) {
  const { isVisible, hideFootnote } = useContext(FootnotesContext)

  useEffect(() => {
    function handleOutsideClick(e) {
      if (!isVisible) {
        return
      }

      if (markerRef.current && !markerRef.current.contains(e.target)) {
        hideFootnote()
      }
    }

    function handleEscKey(e) {
      if (e.key === 'Escape') {
        hideFootnote()
      }
    }

    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('keydown', handleEscKey)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isVisible, markerRef, hideFootnote])
}
