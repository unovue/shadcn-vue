import { registryItemSchema } from 'shadcn-vue/schema'
import { parseDesignSystemConfig } from '@/lib/parse-design-system-config'
import { buildRegistryBase } from '@/registry/config'

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as Record<string, string | undefined>
  const result = parseDesignSystemConfig(query)

  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: result.error })
  }

  const registryBase = buildRegistryBase(result.data)
  const parseResult = registryItemSchema.safeParse(registryBase)

  if (!parseResult.success) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Invalid registry base item',
      data: parseResult.error.format(),
    })
  }

  setHeader(event, 'Content-Type', 'application/json; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=0, must-revalidate')

  return parseResult.data
})
