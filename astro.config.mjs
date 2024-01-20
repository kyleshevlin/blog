import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), tailwind(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
  site: 'https://kyleshevlin.com',
})
