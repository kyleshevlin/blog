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

const makeDefaultCSSVars = colors => ({
  '--colors-background': colors.background,
  '--colors-text': colors.text,
  '--colors-accent': colors.accent,
  '--colors-offset': colors.offset,
  '--colors-offsetMore': colors.offsetMore,
  '--colors-error': colors.error,
  '--fonts-catamaran': 'Catamaran, sans-serif',
  '--components-announcementBanner-background': 'var(--colors-accent)',
  '--components-announcementBanner-text': 'var(--colors-background)',
  '--components-announcementBanner-links-text': '#f2f2f2',
  '--components-announcementBanner-links-hover-text':
    'var(--colors-background)',
  '--components-button-background': 'var(--colors-accent)',
  '--components-button-text': 'var(--colors-background)',
  '--components-footer-background': 'var(--colors-text)',
  '--components-footer-text': 'var(--colors-background)',
  '--components-newsletterCTA-background': 'var(--colors-accent)',
  '--components-newsletterCTA-text': 'var(--colors-background)',
  '--components-newsletterCTA-errorBox-background': 'var(--colors-error)',
  '--components-newsletterCTA-errorBox-text': 'var(--colors-background)',
  '--components-newsletterCTA-inputs-background': 'var(--colors-background)',
  '--components-newsletterCTA-inputs-text': 'var(--colors-text)',
  '--components-newsletterCTA-inputs-placeholderText':
    'var(--colors-offsetMore)',
  '--components-newsletterCTA-submitButton-background': 'var(--colors-offset)',
  '--components-newsletterCTA-submitButton-text': 'var(--colors-accent)',
  '--components-newsletterCTA-submitButton-hover-background':
    'var(--colors-background)',
  '--components-newsletterCTA-submitButton-hover-text': 'var(--colors-accent)',
  '--components-newsletterCTA-successBox-background': 'var(--colors-offset)',
  '--components-newsletterCTA-successBox-text': 'var(--colors-text)',
  '--components-pagination-normal-background': 'var(--colors-accent)',
  '--components-pagination-normal-text': 'var(--colors-background)',
  '--components-pagination-active-background': 'var(--colors-offset)',
  '--components-pagination-active-text': 'var(--colors-accent)',
  '--components-searchBox-text': 'var(--colors-text)',
  '--components-searchError-background': 'var(--colors-error)',
  '--components-searchError-text': 'var(--colors-background)',
})

const LIGHT_VARS = makeDefaultCSSVars(LIGHT_COLORS)

const DARK_VARS = {
  ...makeDefaultCSSVars(DARK_COLORS),
  '--components-announcementBanner-text': 'var(--colors-text)',
  '--components-announcementBanner-links-hover-text': 'var(--colors-text)',
  '--components-button-text': 'var(--colors-text)',
  '--components-footer-background': 'var(--colors-offset)',
  '--components-footer-text': 'var(--colors-text)',
  '--components-newsletterCTA-text': 'var(--colors-text)',
  '--components-newsletterCTA-errorBox-text': 'var(--colors-text)',
  '--components-newsletterCTA-inputs-background': 'var(--colors-text)',
  '--components-newsletterCTA-inputs-text': 'var(--colors-background)',
  '--components-newsletterCTA-submitButton-background': '#f2f2f2',
  '--components-newsletterCTA-submitButton-hover-background':
    'var(--colors-text)',
  '--components-pagination-normal-text': 'var(--colors-text)',
  '--components-pagination-active-text': 'var(--colors-text)',
}

const BLACKOUT_VARS = {
  ...makeDefaultCSSVars(BLACKOUT_COLORS),
  '--components-announcementBanner-links-text': 'var(--colors-offsetMore)',
  '--components-footer-background': 'var(--colors-offset)',
  '--components-footer-text': 'var(--colors-text)',
  '--components-newsletterCTA-errorBox-text': 'var(--colors-text)',
  '--components-newsletterCTA-inputs-background': 'var(--colors-text)',
  '--components-newsletterCTA-inputs-text': 'var(--colors-background)',
}

const makeCSSVarsString = obj =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    return acc + `${key}:${value};`
  }, '')

const THEME_TO_CSS_VARS = {
  blackout: BLACKOUT_VARS,
  dark: DARK_VARS,
  light: LIGHT_VARS,
}

const getCSSVars = (theme = 'light') =>
  makeCSSVarsString(THEME_TO_CSS_VARS[theme]).replace(/\s/g, '')

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(getInitialTheme)

  const rotateTheme = () => {
    setTheme(NEXT_THEME[theme])
  }

  React.useEffect(() => {
    document.documentElement.setAttribute('style', getCSSVars(theme))
  }, [theme])

  return (
    <EmotionThemeProvider theme={{ ...THEMES[theme], rotateTheme }}>
      {children}
    </EmotionThemeProvider>
  )
}
