import React from 'react'

export default function useForceUpdate() {
  const [, setState] = React.useState(true)
  const forceUpdate = React.useCallback(() => {
    setState(x => !x)
  }, [])

  return forceUpdate
}
