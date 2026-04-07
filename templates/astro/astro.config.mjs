import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
  },
})
