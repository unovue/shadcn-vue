export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '../src/module'],
  shadcn: {
    prefix: 'Ui',
  },
  devtools: { enabled: true },
})
