export const FRAMEWORKS = {
  vite: {
    name: 'vite',
    label: 'Vite',
    links: {
      installation: 'https://shadcn-vue.com/docs/installation/vite',
      tailwind: 'https://tailwindcss.com/docs/guides/vite',
    },
  },
  nuxt: {
    name: 'nuxt',
    label: 'Nuxt',
    links: {
      installation: 'https://shadcn-vue.com/docs/installation/nuxt',
      tailwind: 'https://tailwindcss.com/docs/guides/nuxtjs',
    },
  },
  astro: {
    name: 'astro',
    label: 'Astro',
    links: {
      installation: 'https://shadcn-vue.com/docs/installation/astro',
      tailwind: 'https://tailwindcss.com/docs/guides/astro',
    },
  },
  laravel: {
    name: 'laravel',
    label: 'Laravel',
    links: {
      installation: 'https://shadcn-vue.com/docs/installation/laravel',
      tailwind: 'https://tailwindcss.com/docs/guides/laravel',
    },
  },
  manual: {
    name: 'manual',
    label: 'Manual',
    links: {
      installation: 'https://shadcn-vue.com/docs/installation/manual',
      tailwind: 'https://tailwindcss.com/docs/installation',
    },
  },
} as const

export type Framework = (typeof FRAMEWORKS)[keyof typeof FRAMEWORKS]
