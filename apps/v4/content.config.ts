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
        rawbody: z.string(), // reference: https://content.nuxt.com/docs/advanced/raw-content
        links: z.object({
          doc: z.string(),
          api: z.string(),
        }),
        new: z.boolean(),
      }),
    }),
  },
})
