import path from 'node:path'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'shadcn-vue',
  description: 'A VitePress Site',
  srcDir: path.resolve(__dirname, '../src/content'),
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src/lib'),
      },
    },
  },
})
