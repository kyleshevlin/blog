import React from 'react'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import { COLORS, FONTS } from '../constants'

const error = {
  background: COLORS.red,
  text: COLORS.white,
}

const newsletterCTA = {
  background: COLORS.teal,
  text: COLORS.white,

  inputs: {
    background: COLORS.white,
    text: COLORS.black,
    placeholderText: COLORS.gray,
  },

  submitButton: {
    background: COLORS.lightGray,
    text: COLORS.teal,

    '&:hover': {
      background: COLORS.white,
      text: COLORS.teal,
    },
  },

  successBox: {
    background: COLORS.lightGray,
    text: COLORS.black,
  },
}

const searchBox = {
  text: COLORS.black,
}

const searchError = error

const button = {
  background: COLORS.teal,
  text: COLORS.white,
}

const lightTheme = {
  colors: {
    background: COLORS.white,
    text: COLORS.black,
    accent: COLORS.teal,
    offset: COLORS.lightGray,
    offsetMore: COLORS.gray,
    error,
  },
  components: {
    footer: {
      background: COLORS.black,
      text: COLORS.white,
    },
    newsletterCTA,
    pagination: {
      normal: {
        background: COLORS.teal,
        text: COLORS.white,
      },
      active: {
        background: COLORS.lightGray,
        text: COLORS.teal,
      },
    },
    searchBox,
    searchError,
    button,
  },
  fonts: FONTS,
}

const darkTheme = {
  colors: {
    background: '#040D10',
    text: '#e8e8e8',
    accent: COLORS.teal,
    offset: '#0E2D39',
    offsetMore: '#184D62',
    error,
  },
  components: {
    footer: {
      background: '#040D10',
      text: '#e8e8e8',
    },
    newsletterCTA,
    pagination: {
      normal: {
        background: COLORS.teal,
        text: COLORS.white,
      },
      active: {
        background: '#0E2D39',
        text: COLORS.white,
      },
    },
    searchBox,
    searchError,
    button,
  },
  fonts: FONTS,
}

const BLACKOUT = {
  black: '#000',
  white: '#fff',
  accent: '#fce21b',
  offset: '#181818',
  offsetMore: '#282828',
  error,
}

const blackoutTheme = {
  colors: {
    background: BLACKOUT.black,
    text: BLACKOUT.white,
    accent: BLACKOUT.accent,
    offset: BLACKOUT.offset,
    offsetMore: BLACKOUT.offsetMore,
    error,
  },
  components: {
    footer: {
      background: BLACKOUT.offset,
      text: BLACKOUT.white,
    },
    newsletterCTA: {
      background: BLACKOUT.accent,
      text: BLACKOUT.black,

      inputs: {
        background: BLACKOUT.white,
        text: BLACKOUT.black,
        placeholderText: BLACKOUT.offsetMore,
      },

      submitButton: {
        background: BLACKOUT.offset,
        text: BLACKOUT.accent,

        '&:hover': {
          background: BLACKOUT.offsetMore,
          text: BLACKOUT.accent,
        },
      },

      successBox: {
        background: BLACKOUT.offset,
        text: BLACKOUT.black,
      },
    },
    pagination: {
      normal: {
        background: BLACKOUT.accent,
        text: BLACKOUT.black,
      },
      active: {
        background: BLACKOUT.white,
        text: BLACKOUT.black,
      },
    },
    searchBox,
    searchError,
    button: {
      background: BLACKOUT.accent,
      text: BLACKOUT.black,
    },
  },
  fonts: FONTS,
}

const THEMES = {
  blackout: blackoutTheme,
  dark: darkTheme,
  light: lightTheme,
}

const NEXT_THEME = {
  blackout: 'light',
  dark: 'blackout',
  light: 'dark',
}

const getInitialTheme = () => 'blackout'

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(getInitialTheme)

  const toggleTheme = () => {
    setTheme(NEXT_THEME[theme])
  }

  return (
    <EmotionThemeProvider theme={{ ...THEMES[theme], toggleTheme }}>
      {children}
    </EmotionThemeProvider>
  )
}
