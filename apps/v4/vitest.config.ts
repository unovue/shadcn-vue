import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      // The icon placeholder reads the design system through Nuxt composables, so tests use a plain element.
      {
        find: /^@\/registry\/bases\/vase\/components\/icon-placeholder(\/IconPlaceholder\.vue)?$/,
        replacement: `${root}tests/vase/icon-placeholder.ts`,
      },
      { find: /^[@~]\//, replacement: root },
    ],
  },
})
