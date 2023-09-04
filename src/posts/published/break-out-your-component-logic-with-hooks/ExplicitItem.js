import React from 'react'
import Button from '../../../components/Button'
import { useSpacing } from '@kyleshevlin/layout'

export default function ExplicitItem() {
  const bs = useSpacing()
  const [isSelected, setSelected] = React.useState(false)

  const select = () => {
    setSelected(true)
  }

  const unselect = () => {
    setSelected(false)
  }

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
