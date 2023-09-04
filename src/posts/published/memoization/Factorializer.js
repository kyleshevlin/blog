import React from 'react'
import Button from '../../../components/Button'
import { Input, useNumberInput } from '../../../components/Inputs'
import memoize from './memoize'
import { useSpacing } from '@kyleshevlin/layout'

const FactorializerContext = React.createContext()

function FactorializerProvider({ children }) {
  const [cache, setCache] = React.useState(null)

  return (
    <FactorializerContext.Provider value={{ cache, setCache }}>
      {children}
    </FactorializerContext.Provider>
  )
}

const useFactorializerContext = () => React.useContext(FactorializerContext)

export default function Factorializer() {
  return (
    <FactorializerProvider>
      <Container />
    </FactorializerProvider>
  )
}

function Container() {
  const { setCache } = useFactorializerContext()
  const updateCache = cache => setCache(cache)
  const resetCache = () => setCache(null)

  const factorial = memoize(
    n => {
      if (n === 0) return 1
      return n * factorial(n - 1)
    },
    updateCache,
    updateCache
  )

  const factorialRef = React.useRef(factorial)

  return <Child resetCache={resetCache} updateCache={factorialRef.current} />
}

function Child({ resetCache, updateCache }) {
  const bs = useSpacing()
  const { cache } = useFactorializerContext()
  const [result, setResult] = React.useState(0)
  const [value, onChange] = useNumberInput(0)

  const handleSubmit = e => {
    e.preventDefault()
    setResult(updateCache(value))
  }

  const handleReset = () => {
    resetCache()
    setResult(0)
  }

  return (
    <div>
      <form
        css={{
          display: 'flex',
          flexDirection: 'column',
          'div + div': { marginTop: bs(0.5) },
        }}
        onSubmit={handleSubmit}
      >
        <Input
          label="Factor"
          onChange={onChange}
          value={value}
          pattern="[0-9]*"
        />
        <div>
          <Button type="submit">Factorialize</Button>
        </div>
      </form>
      {Boolean(result) && (
        <div css={{ marginTop: bs(0.5) }}>
          <span css={{ marginRight: bs(0.5) }}>Result: {result}</span>
          <Button onClick={handleReset}>Reset Cache</Button>
        </div>
      )}
      {cache && (
        <div
          css={{
            backgroundColor: 'var(--colors-accent)',
            color: 'var(--colors-text-on-accent)',
            borderRadius: 2,
            marginTop: bs(0.5),
            padding: `${bs(0.25)} ${bs(0.5)}`,
          }}
        >
          <pre css={{ margin: 0 }}>{JSON.stringify(cache, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
