import { isClient, watchImmediate } from '@vueuse/core'

const COOKIE_NAME = 'active_theme'
const DEFAULT_THEME = 'default'

export function useThemeConfig() {
  const activeTheme = useCookie<string>(COOKIE_NAME, { default: () => DEFAULT_THEME, path: '/', maxAge: 31536000, sameSite: 'lax' })

  watchImmediate(activeTheme, () => {
    if (!isClient)
      return

    Array.from(document.body.classList)
      .filter(className => className.startsWith('theme-'))
      .forEach((className) => {
        document.body.classList.remove(className)
      })
    document.body.classList.add(`theme-${activeTheme.value}`)
    if (activeTheme.value.endsWith('-scaled')) {
      document.body.classList.add('theme-scaled')
    }
  })

  return {
    activeTheme,
  }
}
