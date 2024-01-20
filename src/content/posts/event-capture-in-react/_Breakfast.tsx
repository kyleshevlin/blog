import React from 'react'
import { Button } from '../../../components/Button'

const FOODS = ['Eggs', 'Bacon', 'Pancakes', 'Toast']

export default function Breakfast() {
  const [selected, setSelected] = React.useState(null)

  // @ts-expect-error e is any
  const update = React.useCallback(e => {
    setSelected(e.target.value)
  }, [])

  return (
    <div className="flex flex-col gap-4 font-sans">
      <p>Selected breakfast food: {String(selected)}</p>

      <div className="flex gap-2" onClickCapture={update}>
        {FOODS.map(food => (
          <Button className="shrink grow basis-1/4" key={food} value={food}>
            {food}
          </Button>
        ))}
      </div>
    </div>
  )
}
