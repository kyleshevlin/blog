import React from 'react'
import Button from '../../../components/Button'
import { useSpacing } from '@kyleshevlin/layout'

function useBooleanAPI(initialState = false) {
  const [state, setState] = React.useState(Boolean(initialState))

  const setTrue = () => {
    setState(true)
  }

  const setFalse = () => {
    setState(false)
  }

  const toggle = () => {
    setState(x => !x)
  }

  return {
    setFalse,
    setTrue,
    state,
    toggle,
  }
}

function TogglingItem() {
  const bs = useSpacing()
  const { state: isSelected, toggle: toggleSelection } = useBooleanAPI()

  return (
    <>
      <div css={{ marginBottom: bs(0.5) }}>
        Is selected? {String(isSelected)}
      </div>
      <Button onClick={toggleSelection}>Toggle</Button>
    </>
  )
}

function ExplicitItem() {
  const bs = useSpacing()
  const {
    state: isSelected,
    setFalse: unselect,
    setTrue: select,
  } = useBooleanAPI()

  return (
    <>
      <div css={{ marginBottom: bs(0.5) }}>
        Is selected? {String(isSelected)}
      </div>
      <div css={{ 'button + button': { marginLeft: bs(0.5) } }}>
        <Button onClick={select}>Select</Button>
        <Button onClick={unselect}>Unselect</Button>
      </div>
    </>
  )
}

export default function ItemsUsingCustomHook() {
  const bs = useSpacing()

  return (
    <>
      <div css={{ marginBottom: bs(1) }}>
        <TogglingItem />
      </div>
      <ExplicitItem />
    </>
  )
}
