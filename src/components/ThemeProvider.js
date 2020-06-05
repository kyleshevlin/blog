import React from 'react'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import { darken } from 'polished'
import { FONTS } from '../constants'

const defaultComponents = colors => ({
  announcementBanner: {
    background: colors.accent,
    text: colors.background,
    links: {
      text: darken(0.05, colors.background),

      '&:hover': {
        text: colors.background,
      },
    },
  },
  button: {
    background: colors.accent,
    text: colors.background,
  },
  footer: {
    background: colors.text,
    text: colors.background,
  },
  newsletterCTA: {
    background: colors.accent,
    text: colors.background,
    errorBox: {
      background: colors.error,
      text: colors.text,
    },
    inputs: {
      background: colors.background,
      text: colors.text,
      placeholderText: colors.offsetMore,
    },
    submitButton: {
      background: colors.offset,
      text: colors.accent,
      '&:hover': {
        background: colors.background,
        text: colors.accent,
      },
    },
    successBox: {
      background: colors.offset,
      text: colors.text,
    },
  },
  pagination: {
    normal: {
      background: colors.accent,
      text: colors.background,
    },
    active: {
      background: colors.offset,
      text: colors.accent,
    },
  },
  searchBox: {
    text: colors.text,
  },
  searchError: {
    background: colors.error,
    text: colors.background,
  },
})

const getEmptyTheme = () => ({})

const generateTheme = (colors, fonts, componentOverrider = getEmptyTheme) => {
  const componentDefaults = defaultComponents(colors)

  return {
    colors,
    fonts,
    components: {
      ...componentDefaults,
      ...componentOverrider(colors, componentDefaults),
    },
  }
}

const LIGHT_COLORS = {
  background: '#fff',
  text: '#333',
  accent: '#33a1cc',
  offset: '#eff4f5',
  offsetMore: '#9baab0',
  error: '#dd385c',
}

const DARK_COLORS = {
  background: '#040D10',
  text: '#fff',
  accent: '#33a1cc',
  offset: '#0E2D39',
  offsetMore: '#184D62',
  error: '#dd385c',
}

const BLACKOUT_COLORS = {
  background: '#000',
  text: '#fff',
  accent: '#fce21b',
  offset: '#242424',
  offsetMore: '#323232',
  error: '#dd385c',
}

const lightTheme = generateTheme(LIGHT_COLORS, FONTS, (colors, defaults) => ({
  newsletterCTA: {
    ...defaults.newsletterCTA,
    errorBox: {
      ...defaults.newsletterCTA.errorBox,
      text: colors.background,
    },
  },
}))

const darkTheme = generateTheme(DARK_COLORS, FONTS, (colors, defaults) => ({
  announcementBanner: {
    ...defaults.announcementBanner,
    text: colors.text,
    links: {
      text: darken(0.05, colors.text),

      '&:hover': {
        text: colors.text,
      },
    },
  },
  button: {
    ...defaults.button,
    text: colors.text,
  },
  footer: {
    background: colors.offset,
    text: colors.text,
  },
  newsletterCTA: {
    ...defaults.newsletterCTA,
    text: colors.text,
    inputs: {
      background: colors.text,
      text: colors.background,
    },
    submitButton: {
      ...defaults.newsletterCTA.submitButton,
      background: darken(0.05, colors.text),

      '&:hover': {
        ...defaults.newsletterCTA.submitButton['&:hover'],
        background: colors.text,
      },
    },
  },
  pagination: {
    normal: {
      ...defaults.pagination.normal,
      text: colors.text,
    },
    active: {
      ...defaults.pagination.active,
      text: colors.text,
    },
  },
}))

const blackoutTheme = generateTheme(
  BLACKOUT_COLORS,
  FONTS,
  (colors, defaults) => ({
    announcementBanner: {
      ...defaults.announcementBanner,
      links: {
        text: colors.offsetMore,

        '&:hover': {
          text: colors.background,
        },
      },
    },
    footer: {
      background: colors.offset,
      text: colors.text,
    },
    newsletterCTA: {
      ...defaults.newsletterCTA,
      text: colors.background,
      inputs: {
        background: colors.text,
        text: colors.background,
      },
    },
  })
)

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

  const rotateTheme = () => {
    setTheme(NEXT_THEME[theme])
  }

  return (
    <EmotionThemeProvider theme={{ ...THEMES[theme], rotateTheme }}>
      {children}
    </EmotionThemeProvider>
  )
}
