import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import { legacyDocsPages, legacyDocsRedirect, resolveBase, USER_CONFIG_COOKIE } from '@/lib/docs-base'

function chosenBase(event: H3Event) {
  try {
    return JSON.parse(getCookie(event, USER_CONFIG_COOKIE) ?? '').base
  }
  catch {
    return undefined
  }
}

export default defineEventHandler(async (event) => {
  const { pathname, searchParams } = getRequestURL(event)
  const candidates = legacyDocsPages(pathname)
  if (candidates.length === 0) {
    return
  }

  const pages = await queryCollection(event, 'content').where('path', 'IN', candidates).select('path').all()
  const path = legacyDocsRedirect(pathname, resolveBase(searchParams.get('base'), chosenBase(event)), pages.map(page => page.path))
  if (!path) {
    return
  }

  searchParams.delete('base')
  const search = searchParams.toString()
  // The target depends on the query and the cookie, so no cache stores it.
  setResponseHeader(event, 'cache-control', 'private, no-store')
  return sendRedirect(event, search ? `${path}?${search}` : path, 302)
})
