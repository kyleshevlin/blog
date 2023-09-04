import React from 'react'
import { Flex, useSpacing } from '@kyleshevlin/layout'

const OurInputStyleContext = React.createContext('none')

export function OurInputStyleProvider({ children, variant = 'none' }) {
  return (
    <OurInputStyleContext.Provider value={variant}>
      {children}
    </OurInputStyleContext.Provider>
  )
}

const useInputStyle = () => React.useContext(OurInputStyleContext)

export function OurInput({ id, label, required = false }) {
  const bs = useSpacing()
  const inputStyle = useInputStyle()

  const getHelperText = () => {
    if (inputStyle === 'showOptionals' && !required) return ' (optional)'
    if (inputStyle === 'showRequireds' && required) return '*'

    return null
  }

  return (
    <div style={{ backgroundColor: 'var(--colors-offset)', padding: bs(1) }}>
      <Flex direction="column" gap={0.25}>
        <label htmlFor={id} style={{ fontFamily: 'var(--fonts-secondary)' }}>
          <span style={{ fontWeight: 'bold' }}>{label}</span>
          {getHelperText()}
        </label>

        <input
          id={id}
          required={required}
          style={{ display: 'block', padding: bs(0.25), width: '100%' }}
          type="text"
        />
      </Flex>
    </div>
  )
}
