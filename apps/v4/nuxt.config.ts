import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'vue-sonner/style.css'],
  modules: ['@nuxtjs/color-mode', '@nuxt/fonts', '@nuxt/content', 'nuxt-shiki'],
  components: [
    { path: '~/components' },
    { path: '~/components/content', global: true, pathPrefix: false },
    { path: '~/registry/new-york-v4/ui/accordion', global: true, pathPrefix: false, ignore: ['*.ts'] },
  ],
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
    },
  },
  content: {
    build: {
      markdown: {
        highlight: false,
      },
    },
  },
  shiki: {
    defaultTheme: {
      light: 'github-light-default',
      dark: 'github-dark',
    },
    bundledLangs: ['ts', 'js', 'vue', 'html', 'json', 'bash'],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  colorMode: {
    classSuffix: '',
  },
  build: {
    transpile: [
      'vee-validate',
      'vue-sonner',
    ],
  },
  nitro: {
    preset: 'cloudflare_module',
  },
  routeRules: {
    '/**': { static: true },
  },
})
