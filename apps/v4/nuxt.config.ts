import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-05',
  devtools: { enabled: true },
  srcDir: '.',
  css: ['~/assets/css/main.css', 'vue-sonner/style.css'],
  modules: ['@nuxtjs/color-mode', '@nuxt/fonts', '@nuxt/content', 'nuxt-shiki', 'nuxt-og-image', '@nuxt/image'],
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
    families: [
      // To improve and only load font when needed
      { name: 'Geist', global: true, provider: 'google' },
      { name: 'Geist Mono', global: true, provider: 'google' },
      { name: 'Inter', global: true, provider: 'google' },
      { name: 'Noto Sans', global: true, provider: 'google' },
      { name: 'Noto Serif', global: true, provider: 'google' },
      { name: 'Nunito Sans', global: true, provider: 'google' },
      { name: 'Figtree', global: true, provider: 'google' },
      { name: 'JetBrains Mono', global: true, provider: 'google' },
      { name: 'Roboto', global: true, provider: 'google' },
      { name: 'Roboto Slab', global: true, provider: 'google' },
      { name: 'Raleway', global: true, provider: 'google' },
      { name: 'DM Sans', global: true, provider: 'google' },
      { name: 'Public Sans', global: true, provider: 'google' },
      { name: 'Outfit', global: true, provider: 'google' },
      { name: 'Oxanium', global: true, provider: 'google' },
      { name: 'Manrope', global: true, provider: 'google' },
      { name: 'Space Grotesk', global: true, provider: 'google' },
      { name: 'Montserrat', global: true, provider: 'google' },
      { name: 'IBM Plex Sans', global: true, provider: 'google' },
      { name: 'Source Sans 3', global: true, provider: 'google' },
      { name: 'Instrument Sans', global: true, provider: 'google' },
      { name: 'Merriweather', global: true, provider: 'google' },
      { name: 'Lora', global: true, provider: 'google' },
      { name: 'Playfair Display', global: true, provider: 'google' },
    ],
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
    plugins: [tailwindcss() as any],
    ssr: {
      noExternal: ['@tabler/icons-vue'],
    },
  },
  build: {
    transpile: ['vee-validate', 'vue-sonner'],
  },
  routeRules: {
    // Static assets - immutable, long cache
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    // Pages - prerender as static (reset on each deploy)
    '/docs/**': { prerender: true },
    '/blocks/**': { prerender: true },
    '/charts/**': { prerender: true },
    '/examples/**': { prerender: true },
    '/colors/**': { prerender: true },
    '/themes': { prerender: true },
    // API routes - cache indefinitely (reset on each deploy)
    '/api/**': { swr: 31536000 },
  },
  nitro: {
    preset: 'cloudflare-module',
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: false,
      autoSubfolderIndex: false,
    },
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
    serverAssets: [
      { baseName: 'blocks', dir: '../registry/new-york-v4/blocks' },
    ],
  },
  app: {
    head: {
      link: [
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'shortcut icon', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [{ name: 'keywords', content: 'Nuxt,Vue,Tailwind CSS,Components,shadcn' }],
    },
  },
  ogImage: {
    fonts: [
      'Geist:400',
      'Geist:500',
      'Geist:600',
    ],
  },
})
