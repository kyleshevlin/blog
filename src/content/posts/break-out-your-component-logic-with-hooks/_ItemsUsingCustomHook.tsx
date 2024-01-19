import React from 'react'
import { Button } from '../../../components/Button'

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
  const { state: isSelected, toggle: toggleSelection } = useBooleanAPI()

  return (
    <div className="flex flex-col items-start gap-4 font-sans">
      <div>Is selected? {String(isSelected)}</div>
      <Button onClick={toggleSelection}>Toggle</Button>
    </div>
  )
}

function ExplicitItem() {
  const {
    state: isSelected,
    setFalse: unselect,
    setTrue: select,
  } = useBooleanAPI()

  return (
    <div className="flex flex-col gap-4 font-sans">
      <div>Is selected? {String(isSelected)}</div>
      <div className="flex gap-2">
        <Button onClick={select}>Select</Button>
        <Button onClick={unselect}>Unselect</Button>
      </div>
    </div>
  )
}

export default function ItemsUsingCustomHook() {
  return (
    <div className="flex flex-col gap-8">
      <TogglingItem />
      <ExplicitItem />
    </div>
  )
}
