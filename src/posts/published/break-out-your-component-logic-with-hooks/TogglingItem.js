import React from 'react'
import Button from '../../../components/Button'
import { useSpacing } from '@kyleshevlin/layout'

export default function TogglingItem() {
  const bs = useSpacing()
  const [isSelected, setSelected] = React.useState(false)

  const toggleSelection = () => {
    setSelected(state => !state)
  }

  return (
    <>
      <div css={{ marginBottom: bs(0.5) }}>
        Is selected? {String(isSelected)}
      </div>
      <Button onClick={toggleSelection}>Toggle</Button>
    </>
  )
}
