import React from 'react'
import Button from '../../../components/Button'
import { bs } from '../../../shevy'
import Wrapper from './Wrapper'

export default function TogglingItem() {
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

export function WrappedTogglingItem() {
  return (
    <Wrapper>
      <TogglingItem />
    </Wrapper>
  )
}
