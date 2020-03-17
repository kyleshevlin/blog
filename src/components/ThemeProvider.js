import React from 'react'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import { COLORS, FONTS } from '../constants'

const lightTheme = {
  colors: {
    background: COLORS.white,
    text: COLORS.black,
    accent: COLORS.teal,
    offset: COLORS.lightGray,
    offsetMore: COLORS.gray
  },
  fonts: { ...FONTS }
}

export default function ThemeProvider({ children }) {
  return (
    <EmotionThemeProvider theme={lightTheme}>{children}</EmotionThemeProvider>
  )
}
