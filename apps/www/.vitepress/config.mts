import path from 'node:path'
import { defineConfig } from 'vitepress'
import Icons from 'unplugin-icons/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'shadcn-vue',
  description: 'A VitePress Site',
  srcDir: path.resolve(__dirname, '../src/content'),
  markdown: {
    theme: 'css-variables',
  },
  vite: {
    plugins: [
      Icons({ compiler: 'vue3', autoInstall: true }) as any,
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src'),
      },
    },
  },
})
