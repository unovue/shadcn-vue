import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-05',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'vue-sonner/style.css'],
  modules: ['@nuxtjs/color-mode', '@nuxt/fonts', '@nuxt/content', 'nuxt-shiki'],
  components: [
    { path: '~/components', ignore: ['_internal/*', '_internal/**/*', 'examples/*', 'examples/**/*'] },
    { path: '~/components/demo', pathPrefix: false },
    { path: '~/components/content', global: true, pathPrefix: false },
    {
      path: '~/registry/new-york-v4/ui/accordion',
      global: true,
      pathPrefix: false,
      ignore: ['*.ts'],
    },
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
    database: {
      type: 'd1',
      bindingName: 'DB',
    },
    // required to prevent error related to better-sqlite3 during build and deploy
    experimental: {
      sqliteConnector: 'native',
    },
  },
  shiki: {
    defaultTheme: {
      light: 'github-light-default',
      dark: 'github-dark',
    },
    bundledLangs: [
      'ts',
      'tsx',
      'js',
      'vue',
      'html',
      'json',
      'bash',
      'astro',
      'toml',
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  colorMode: {
    classSuffix: '',
  },
  build: {
    transpile: ['vee-validate', 'vue-sonner'],
  },
  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        name: 'shadcn-vue-nuxt',
        d1_databases: [
          {
            binding: 'DB',
            database_id: '4c26cb33-9277-4c9b-8433-42f0a6e84b69',
          },
        ],
        observability: {
          logs: {
            enabled: true,
            head_sampling_rate: 1,
            invocation_logs: true,
          },
        },
      },
    },
  },
})
