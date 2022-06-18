import React from 'react'
import Button from '../../../components/Button'
import Flex from '../../../components/Flex'

const FOODS = ['Eggs', 'Bacon', 'Pancakes', 'Toast']

export default function Breakfast() {
  const [selected, setSelected] = React.useState(null)

  const update = React.useCallback(e => {
    setSelected(e.target.value)
  }, [])

  return (
    <div>
      <p>Selected breakfast food: {String(selected)}</p>
      <div onClickCapture={update}>
        <Flex gap={0.25}>
          {FOODS.map(food => (
            <Button key={food} value={food}>
              {food}
            </Button>
          ))}
        </Flex>
      </div>
    </div>
  )
}
