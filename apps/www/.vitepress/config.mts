import path from 'node:path'
import { defineConfig } from 'vitepress'
import Icons from 'unplugin-icons/vite'
import ComponentPreviewPlugin from './theme/plugins/previewer'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'shadcn-vue',
  description: 'A VitePress Site',
  srcDir: path.resolve(__dirname, '../src'),
  markdown: {
    theme: 'css-variables',
    config(md) {
      md.use(ComponentPreviewPlugin)
    },
  },
  rewrites: {
    'content/(.*)': '(.*)',
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
