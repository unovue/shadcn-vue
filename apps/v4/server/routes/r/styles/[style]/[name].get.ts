import { registryItemSchema } from 'shadcn-vue/schema'
import { fonts } from '@/registry/fonts'

// Font items are identical for every style, so they are served here instead of
// being published into each style directory. Components are static files under
// public/r/styles/<style>/ and are served before this handler ever runs — only
// requests with no file behind them land here, which is why this responds for
// font items and 404s for everything else.
export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')?.replace(/\.json$/, '')
  const font = name ? fonts.find(item => item.name === name) : undefined

  if (!font) {
    throw createError({
      statusCode: 404,
      statusMessage: `Registry item "${name}" not found`,
    })
  }

  const parseResult = registryItemSchema.safeParse({
    $schema: 'https://shadcn-vue.com/schema/registry-item.json',
    ...font,
  })

  if (!parseResult.success) {
    console.error(
      `[r/styles] registry:font validation failed for "${name}"`,
      parseResult.error.format(),
    )
    throw createError({
      statusCode: 500,
      statusMessage: 'Invalid registry font item',
    })
  }

  setHeader(event, 'Content-Type', 'application/json; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=0, must-revalidate')

  return parseResult.data
})
