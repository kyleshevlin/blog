import React from 'react'
import { Button } from '../../../components/Button'
import { Input, useNumberInput } from '../../../components/Inputs'
import memoize from './_memoize'

export default function Factorializer() {
  const [cache, setCache] = React.useState<Record<string, number> | null>(null)

  const factorial = memoize(
    (n: number): number => {
      if (n === 0) return 1
      return n * factorial(n - 1)
    },
    setCache,
    setCache,
  )

  const factorialRef = React.useRef(factorial)
  const resetCache = () => {
    factorialRef.current.reset()
    setCache(null)
  }

  return (
    <Child
      cache={cache}
      resetCache={resetCache}
      updateCache={factorialRef.current}
    />
  )
}

// @ts-expect-error TODO:
function Child({ cache, resetCache, updateCache }) {
  const [result, setResult] = React.useState(0)
  const [value, onChange] = useNumberInput(0)

  const handleClick = () => {
    setResult(updateCache(value))
  }

  const handleReset = () => {
    resetCache()
    setResult(0)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Input
          label="Factor"
          onChange={onChange}
          value={value}
          pattern="[0-9]*"
        />

        <Button onClick={handleClick}>Factorialize</Button>
      </div>

      {Boolean(result) && (
        <div className="flex gap-2 font-sans">
          <span>Result: {result}</span>
          <Button onClick={handleReset}>Reset Cache</Button>
        </div>
      )}

      {cache && (
        <div className="rounded bg-accent text-white">
          <pre>{JSON.stringify(cache, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
