/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'
import { toHSLA } from './src/utils'

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/**/_*.tsx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: toHSLA(200, 73, 48),
          dark: toHSLA(200, 73, 44),
          light: toHSLA(200, 73, 52),
        },
        contra: {
          DEFAULT: toHSLA(347, 87, 60),
          dark: toHSLA(347, 87, 55),
          light: toHSLA(347, 87, 65),
        },
      },
      fontFamily: {
        sans: ['"Catamaran"', ...defaultTheme.fontFamily.sans],
        serif: ['"Droid Serif"', ...defaultTheme.fontFamily.serif],
        system: defaultTheme.fontFamily.sans,
      },
      lineHeight: {
        chill: 1.8,
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
}
