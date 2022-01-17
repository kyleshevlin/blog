import React from 'react'
import {
  getInitialTheme,
  rotateTheme as _rotateTheme,
  setTheme as _setTheme,
} from '../utils/cssCustomPropertySetter'

const ThemeContext = React.createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(getInitialTheme)

  const rotateTheme = React.useCallback(() => {
    setTheme(_rotateTheme)
  }, [])

  React.useEffect(() => {
    _setTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ rotateTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => React.useContext(ThemeContext)
