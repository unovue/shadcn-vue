import { flattenPages, legacyDocsPages, legacyDocsRedirect, resolveBase } from '@/lib/docs-base'

// Client-side counterpart to server/middleware/docs-redirects.ts for in-app navigation.
export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server || legacyDocsPages(to.path).length === 0) {
    return
  }

  const { config } = useConfig()
  const { data: tree } = await useNavigationTree()
  const { base, ...query } = to.query
  const path = legacyDocsRedirect(
    to.path,
    resolveBase(Array.isArray(base) ? base[0] : base, config.value.base),
    flattenPages(tree.value).map(page => page.path),
  )
  if (path) {
    return navigateTo({ path, query, hash: to.hash }, path.startsWith('/raw/') ? { external: true } : undefined)
  }
})
