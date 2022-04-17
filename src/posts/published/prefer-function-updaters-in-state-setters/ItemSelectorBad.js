import React from 'react'
import Button from '../../../components/Button'
import Margin from '../../../components/Margin'
import { bs } from '../../../shevy'

const ITEMS = [
  { id: 1, label: 'One' },
  { id: 2, label: 'Two' },
  { id: 3, label: 'Three' },
]

export default function ItemSelector() {
  const [state, { smartSelectItem, unselectItem }] = useItemSelection()

  const handleItemClick = item => () => {
    smartSelectItem(item)
  }

  return (
    <div>
      <Margin bottom={1}>
        <Margin bottom={0.25}>
          Current state: {JSON.stringify(state, null, 2)}
        </Margin>
        <Button onClick={unselectItem}>Clear selection</Button>
      </Margin>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: bs(),
        }}
      >
        {ITEMS.map(item => (
          <Button
            key={item.id}
            onClick={handleItemClick(item)}
            style={{ width: '100%' }}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

function useItemSelection() {
  const [selectedItem, setSelectedItem] = React.useState(null)

  const handlers = React.useMemo(
    () => ({
      selectItem: item => {
        setSelectedItem(item)
      },
      unselectItem: () => {
        setSelectedItem(null)
      },
      smartSelectItem: item => {
        if (item?.id === selectedItem?.id) {
          setSelectedItem(null)
          return
        }

        setSelectedItem(item)
      },
    }),
    [selectedItem]
  )

  return [selectedItem, handlers]
}
