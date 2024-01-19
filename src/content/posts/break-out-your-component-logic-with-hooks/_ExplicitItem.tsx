import React from 'react'
import { Button } from '../../../components/Button'

export default function ExplicitItem() {
  const [isSelected, setSelected] = React.useState(false)

  const select = () => {
    setSelected(true)
  }

  const unselect = () => {
    setSelected(false)
  }

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
