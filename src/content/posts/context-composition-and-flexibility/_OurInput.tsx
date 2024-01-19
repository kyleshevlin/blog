import React from 'react'

type Variant = 'none' | 'showRequireds' | 'showOptionals'

const OurInputStyleContext = React.createContext<Variant>('none')

export function OurInputStyleProvider({
  children,
  variant = 'none',
}: {
  children: React.ReactNode
  variant: Variant
}) {
  console.log(variant)
  return (
    <OurInputStyleContext.Provider value={variant}>
      {children}
    </OurInputStyleContext.Provider>
  )
}

const useInputStyle = () => React.useContext(OurInputStyleContext)

export function OurInput({
  id,
  label,
  required = false,
}: {
  id: string
  label: string
  required?: boolean
}) {
  const inputStyle = useInputStyle()

  const getHelperText = () => {
    if (inputStyle === 'showOptionals' && !required) return ' (optional)'
    if (inputStyle === 'showRequireds' && required) return '*'

    return null
  }

  return (
    <div className="bg-gray-100 p-8 dark:bg-gray-800">
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="font-sans text-lg">
          <span className="font-bold">{label}</span>
          {getHelperText()}
        </label>

        <input
          className="block w-full rounded border-2 border-gray-300 p-2 leading-none  text-black"
          id={id}
          required={required}
          type="text"
        />
      </div>
    </div>
  )
}
