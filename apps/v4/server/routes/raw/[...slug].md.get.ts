import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const slug = `/${params['slug.md']}`
  const contentSlug = slug.replace('.md', '')
  const page = await queryCollection(event, 'content').path(contentSlug).first()

  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')

  return page.rawbody
})
