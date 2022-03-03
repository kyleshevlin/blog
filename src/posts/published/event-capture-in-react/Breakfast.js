import React from 'react'

const FOODS = ['Eggs', 'Bacon', 'Pancakes', 'Toast']

export default function Breakfast() {
  const [useCapture, setUseCapture] = React.useState(false)
  const parentEventType = useCapture ? 'onClickCapture' : 'onClick'
  const parentProps = {
    [parentEventType]: () => {
      console.log('Parent event handled')
    },
  }

  return (
    <div>
      <div>
        <label>
          Use capture?
          <input
            type="checkbox"
            checked={useCapture}
            onChange={e => setUseCapture(e.target.checked)}
          />
        </label>
      </div>
      <div {...parentProps}>
        {FOODS.map(food => (
          <button
            key={food}
            onClick={() => {
              console.log(`You selected ${food}`)
            }}
          >
            {food}
          </button>
        ))}
      </div>
    </div>
  )
}
