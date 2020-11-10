import React from 'react'
import { bs } from '../../../shevy'

const ObserverContext = React.createContext()

const ObserverContextProvider = ({ children }) => {
  const [state, setState] = React.useState(null)

  const callback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log(entry)
        const id = entry.target.getAttribute('id')
        const value = id === 'start' || id === 'end' ? null : id
        setState(value)
      }
    })
  }

  const observer = new IntersectionObserver(callback, {
    rootMargin: '0px 0px -60% 0px',
  })

  return (
    <ObserverContext.Provider value={{ observer, state }}>
      {children}
    </ObserverContext.Provider>
  )
}

const useObserverContext = () => React.useContext(ObserverContext)

export function PostContainer({ children }) {
  return <ObserverContextProvider>{children}</ObserverContextProvider>
}

export function Story() {
  const { state } = useObserverContext()

  if (state === null) return null

  return (
    <div
      css={{
        backgroundColor: '#eee',
        width: '25%',
        position: 'fixed',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        padding: bs(),
        zIndex: 1,
      }}
    >
      This will be the story: {state}
    </div>
  )
}

export function Chapter({ id }) {
  const { observer } = useObserverContext()
  const ref = React.useRef()

  React.useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current)
    }
  }, [])

  return <div id={id} ref={ref} />
}
