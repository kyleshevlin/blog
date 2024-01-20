/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'hsl(197 60% 50%)',
          dark: 'hsl(197 60% 45%)',
          light: 'hsl(197 60% 55%)',
        },
        contra: {
          DEFAULT: 'hsl(347 87% 60%)',
          dark: 'hsl(347 87% 55%)',
          light: 'hsl(347 87% 65%)',
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
  plugins: [],
}
