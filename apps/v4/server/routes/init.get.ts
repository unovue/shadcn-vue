import { registryItemSchema } from 'shadcn-vue/schema'
import { parseDesignSystemConfig } from '@/lib/parse-design-system-config'
import { buildRegistryBase } from '@/registry/config'

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as Record<string, string | undefined>
  const result = parseDesignSystemConfig(query)

  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: result.error })
  }

  let registryBase
  try {
    registryBase = buildRegistryBase(result.data)
  }
  catch (error) {
    // buildRegistryBase throws on unknown base/iconLibrary lookups — surface
    // as a 400 so clients see a meaningful message instead of a bare 500.
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : 'Invalid configuration',
    })
  }

  const parseResult = registryItemSchema.safeParse(registryBase)

  if (!parseResult.success) {
    // Log the full Zod error server-side; clients only see a generic message
    // so we don't leak the registry item schema shape.
    console.error('[init] registry:base validation failed', parseResult.error.format())
    throw createError({
      statusCode: 500,
      statusMessage: 'Invalid registry base item',
    })
  }

  setHeader(event, 'Content-Type', 'application/json; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=0, must-revalidate')

  return parseResult.data
})
