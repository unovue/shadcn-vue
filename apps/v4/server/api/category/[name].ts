import type { H3Event } from 'h3'
import { getAllBlockIds } from '~/lib/blocks'

export default cachedEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Block name is required',
    })
  }

  const blocks = await getAllBlockIds(['registry:block'], [name])

  return { blocks }
}, {
  shouldBypassCache: () => !!import.meta.dev,
  maxAge: 0, // 60 * 60, // 1 hour
  getKey: (event: H3Event) => event.path,
})
