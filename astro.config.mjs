import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), tailwind(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
  site: 'https://kyleshevlin.com',
})
