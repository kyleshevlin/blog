import React from 'react'
import { Button } from '../../../components/Button'

const ITEMS = [
  { id: 1, label: 'One' },
  { id: 2, label: 'Two' },
  { id: 3, label: 'Three' },
]

type Item = (typeof ITEMS)[number]

export default function ItemSelector() {
  const [state, { smartSelectItem, unselectItem }] = useItemSelection<Item>()

  const handleItemClick = (item: Item) => () => {
    smartSelectItem(item)
  }

  return (
    <div className="flex flex-col gap-4 font-sans">
      <div className="flex flex-col gap-2">
        <div>Current state: {JSON.stringify(state, null, 2)}</div>
        <Button onClick={unselectItem}>Clear selection</Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {ITEMS.map(item => (
          <Button
            className="w-full"
            key={item.id}
            onClick={handleItemClick(item)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

function useItemSelection<T extends { id?: string | number }>(
  initialValue: T | null = null,
) {
  const [selectedItem, setSelectedItem] = React.useState<T | null>(initialValue)

  const handlers = React.useMemo(
    () => ({
      selectItem: (item: T) => {
        setSelectedItem(item)
      },
      unselectItem: () => {
        setSelectedItem(null)
      },
      smartSelectItem: (item: T) => {
        if (item?.id === selectedItem?.id) {
          setSelectedItem(null)
          return
        }

        setSelectedItem(item)
      },
    }),
    [selectedItem],
  )

  return [selectedItem, handlers] as const
}
