import React from 'react'
import { Button } from '../../../components/Button'
import { Input, useNumberInput } from '../../../components/Inputs'
import memoize from './_memoize'

const add = (x: number, y: number) => x + y

export default function Adder() {
  const [cacheHit, setCacheHit] = React.useState(false)

  // We memoize and use a ref in the container
  // so that we guarantee the same memoized function
  // is always passed to the form
  const memoizedAdd = React.useRef(
    memoize(
      add,
      () => setCacheHit(true),
      () => setCacheHit(false),
    ),
  )

  const [xValue, xOnChange] = useNumberInput(0)
  const [yValue, yOnChange] = useNumberInput(0)
  const [result, setResult] = React.useState<number | null>(null)

  const handleClick = () => {
    setResult(memoizedAdd.current(xValue, yValue))
  }

  return (
    <div className="flex flex-col gap-4">
      <Input label="X:" value={xValue} onChange={xOnChange} pattern="[0-9]*" />
      <Input label="Y:" value={yValue} onChange={yOnChange} pattern="[0-9]*" />

      <div>
        <Button onClick={handleClick}>Add</Button>
      </div>

      {result !== null && <div className="font-sans">Result: {result}</div>}

      {cacheHit && (
        <div className="rounded bg-accent px-4 py-2 font-sans text-white">
          Cache was hit!
        </div>
      )}
    </div>
  )
}
