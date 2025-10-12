import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['**/.*'],
      },
      schema: z.object({
        links: z.object({
          doc: z.string(),
          api: z.string(),
        }),
        new: z.boolean(),
      }),
    }),
  },
})
