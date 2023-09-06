import path from 'node:path'
import { defineConfig } from 'vitepress'
import Icons from 'unplugin-icons/vite'
import { siteConfig } from './theme/config/site'
import ComponentPreviewPlugin from './theme/plugins/previewer'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: siteConfig.name,
  titleTemplate: ':title - shadcn/vue',
  description: siteConfig.description,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#41b883' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: siteConfig.name }],
    ['meta', { name: 'og:image', content: siteConfig.ogImage }],
    ['meta', { name: 'twitter:image', content: siteConfig.ogImage }],

  ],

  sitemap: {
    hostname: 'https://www.shadcn-vue.com',
    transformItems(items) {
      return items.filter(item => !item.url.includes('migration'))
    },
  },

  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/:path',
      text: 'Edit this page on GitHub',
    },
  },

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
