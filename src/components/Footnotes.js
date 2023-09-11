import React, { useContext, useEffect, useReducer, useRef } from 'react'
import Button, { getButtonStyles } from './Button'
import Container from './Container'
import { Flex, useSpacing } from '@kyleshevlin/layout'

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

const noop = () => {}

const FootnotesContext = React.createContext({
  content: null,
  index: null,
  isVisible: false,
  markers: {},
  addMarker: noop,
  removeMarker: noop,
  updateFootnote: noop,
  hideFootnote: noop,
})

export function FootnotesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addMarker = React.useCallback(payload => {
    dispatch({ type: 'ADD_MARKER', payload })
  }, [])

  const removeMarker = React.useCallback(payload => {
    dispatch({ type: 'REMOVE_MARKER', payload })
  }, [])

  const updateFootnote = React.useCallback(payload => {
    dispatch({ type: 'UPDATE_FOOTNOTE', payload })
  }, [])

  const hideFootnote = React.useCallback(() => {
    dispatch({ type: 'HIDE_FOOTNOTE' })
  }, [])

  const value = React.useMemo(
    () => ({
      ...state,
      addMarker,
      removeMarker,
      hideFootnote,
      updateFootnote,
    }),
    [state, addMarker, removeMarker, hideFootnote, updateFootnote]
  )

  return (
    <FootnotesContext.Provider value={value}>
      {children}
    </FootnotesContext.Provider>
  )
}

const getMarkerStyles = spacing => ({
  ...getButtonStyles(spacing),
  boxShadow: 'none',
  width: 20,
  height: 20,
  fontSize: 12,
  lineHeight: 0,
  padding: 0,
  borderRadius: '50%',
  position: 'relative',
  top: '-2px',

  '&:active': {},

  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 3px 1px var(--colors-accentDark)',
  },
})

export function FootnoteMarker({ content }) {
  const bs = useSpacing()
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
  }, [addMarker, content, removeMarker])

  const buttonStyles = React.useMemo(() => getMarkerStyles(bs), [bs])

  return (
    <button
      css={buttonStyles}
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

const getDisplayMarkerStyles = spacing => ({
  ...getMarkerStyles(spacing),
  lineHeight: 1,
  textAlign: 'center',
  '&:hover': null,
})

export function FootnoteDisplay() {
  const bs = useSpacing()

  const displayElement = useRef(null)
  const { content, hideFootnote, index, isVisible } =
    useContext(FootnotesContext)
  useFootnoteDisplayEvents(displayElement)

  const markerStyles = React.useMemo(() => getDisplayMarkerStyles(bs), [bs])

  return isVisible ? (
    <div
      ref={displayElement}
      css={{
        width: '100%',
        backgroundColor: 'var(--colors-background)',
        position: 'fixed',
        bottom: 0,
        borderTop: '4px solid var(--colors-accent)',
        boxShadow: '0 -4px 6px rgba(0, 0, 0, .15)',
        paddingTop: bs(1),
        paddingBottom: bs(2),
        zIndex: 1,
      }}
    >
      <Container>
        <Flex direction="column" gap={1}>
          <Flex align="center" justify="space-between">
            <div css={markerStyles}>
              <span css={{ position: 'relative', top: 2 }}>{index}</span>
            </div>
            <Button onClick={hideFootnote}>Close</Button>
          </Flex>

          <p
            css={{ marginBottom: 0 }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Flex>
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
