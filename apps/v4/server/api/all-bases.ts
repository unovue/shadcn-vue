import { Index } from '~/registry/bases/__index__'

export default cachedEventHandler(async (event) => {
  return Index
}, {
  shouldBypassCache: () => !!import.meta.dev,
  maxAge: 60 * 60 * 24, // 1 day
})
