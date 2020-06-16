import React from 'react'
import Button from '../../../components/Button'
import { Input, useNumberInput } from '../../../components/Inputs'
import { bs } from '../../../shevy'
import { v } from '../../../utils'
import memoize from './memoize'

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

  const factorial = memoize(
    n => {
      if (n === 0) return 1
      return n * factorial(n - 1)
    },
    updateCache,
    updateCache
  )

  const factorialRef = React.useRef(factorial)

  return <Child fn={factorialRef.current} />
}

function Child({ fn }) {
  const { cache } = useFactorializerContext()
  const [result, setResult] = React.useState(0)
  const [value, onChange] = useNumberInput(0)

  const handleSubmit = e => {
    e.preventDefault()
    setResult(fn(value))
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
        <Input label="Factor" onChange={onChange} value={value} type="number" />
        <div>
          <Button type="submit">Factorialize</Button>
        </div>
      </form>
      <div css={{ marginTop: bs(0.5) }}>Result: {result}</div>
      {cache && (
        <div
          css={{
            backgroundColor: v('colors-accent'),
            color: v('colors-text-on-accent'),
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
