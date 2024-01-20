import React from 'react'
import { Button } from '../../../components/Button'

export default function TogglingItem() {
  const [isSelected, setSelected] = React.useState(false)

  const toggleSelection = () => {
    setSelected(state => !state)
  }

  return (
    <div className="flex flex-col gap-4 font-sans">
      <div>Is selected? {String(isSelected)}</div>
      <Button onClick={toggleSelection}>Toggle</Button>
    </div>
  )
}
