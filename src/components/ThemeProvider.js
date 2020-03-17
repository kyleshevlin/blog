import React from 'react'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import { COLORS, FONTS } from '../constants'

const newsletterCTA = {
  background: COLORS.teal,
  text: COLORS.white,

  outboundLink: {
    background: COLORS.lightGray,
    text: COLORS.teal,

    '&:hover': {
      background: COLORS.white,
      text: COLORS.teal
    }
  }
}

const portfolioItem = {
  text: COLORS.white
}

const lightTheme = {
  colors: {
    background: COLORS.white,
    text: COLORS.black,
    accent: COLORS.teal,
    offset: COLORS.lightGray,
    offsetMore: COLORS.gray
  },
  components: {
    footer: {
      background: COLORS.black,
      text: COLORS.white
    },
    newsletterCTA,
    portfolioItem
  },
  fonts: FONTS
}

const darkTheme = {
  colors: {
    background: '#040D10',
    text: '#e8e8e8',
    accent: COLORS.teal,
    offset: '#0E2D39',
    offsetMore: '#184D62'
  },
  components: {
    footer: {
      background: '#040D10',
      text: '#e8e8e8'
    },
    newsletterCTA,
    portfolioItem
  },
  fonts: FONTS
}

const THEMES = {
  dark: darkTheme,
  light: lightTheme
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState('light')

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
  }

  return (
    <EmotionThemeProvider theme={{ ...THEMES[theme], toggleTheme }}>
      {children}
    </EmotionThemeProvider>
  )
}
