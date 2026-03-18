import type { RegistryItem } from 'shadcn-vue/schema'
import { Index } from '~/registry/__index__'

export default cachedEventHandler(async (event) => {
  return Index as Record<string, RegistryItem>
}, {
  shouldBypassCache: () => !!import.meta.dev,
  maxAge: 60 * 60 * 24, // 1 day
})
