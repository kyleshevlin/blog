import React from 'react'
import Button from '../../../components/Button'
import { Input, useNumberInput } from '../../../components/Inputs'
import { bs } from '../../../shevy'
import { v } from '../../../utils'
import memoize from './memoize'

const AdderContext = React.createContext()

function AdderProvider({ children }) {
  const [cacheHit, setCacheHit] = React.useState(false)

  return (
    <AdderContext.Provider value={{ cacheHit, setCacheHit }}>
      {children}
    </AdderContext.Provider>
  )
}

const useAdderContext = () => React.useContext(AdderContext)

export default function Adder() {
  return (
    <AdderProvider>
      <AdderContainer />
    </AdderProvider>
  )
}

const add = (x, y) => x + y

function AdderContainer() {
  const { setCacheHit } = useAdderContext()

  // We memoize and use a ref in the container
  // so that we guarantee the same memoized function
  // is always passed to the form
  const memoizedAdd = React.useRef(
    memoize(
      add,
      () => setCacheHit(true),
      () => setCacheHit(false)
    )
  )

  return <AdderForm add={memoizedAdd.current} />
}

function AdderForm({ add }) {
  const { cacheHit } = useAdderContext()
  const [xValue, xOnChange] = useNumberInput(0)
  const [yValue, yOnChange] = useNumberInput(0)
  const [result, setResult] = React.useState(0)

  const handleSubmit = e => {
    e.preventDefault()
    setResult(add(xValue, yValue))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            'div + div': { marginTop: bs(0.5) },
          }}
        >
          <Input
            label="X:"
            value={xValue}
            onChange={xOnChange}
            pattern="[0-9]*"
          />
          <Input
            label="Y:"
            value={yValue}
            onChange={yOnChange}
            pattern="[0-9]*"
          />
          <div>
            <Button type="submit">Add</Button>
          </div>
        </div>
      </form>
      {cacheHit && (
        <div
          css={{
            backgroundColor: v('colors-accent'),
            color: v('colors-text-on-accent'),
            borderRadius: 2,
            marginTop: bs(0.5),
            padding: `${bs(0.25)} ${bs(0.5)}`,
          }}
        >
          Cache was hit!
        </div>
      )}
      {Boolean(result) && (
        <div css={{ marginTop: bs(0.5) }}>Result: {result}</div>
      )}
    </>
  )
}
