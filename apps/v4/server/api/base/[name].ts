import type { H3Event } from 'h3'
import { Index } from '~/registry/bases/__index__'

export default cachedEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Block name is required',
    })
  }

  return Index[name]
}, {
  shouldBypassCache: () => !!import.meta.dev,
  // maxAge: 60 * 60 * 24, // 1 day
  getKey: (event: H3Event) => event.path,
})
