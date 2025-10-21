import { createSharedComposable, isClient, watchImmediate } from '@vueuse/core'
import { baseColors } from '@/registry/registry-base-colors'

const THEMES = baseColors.filter(
  theme => !['slate', 'stone', 'gray', 'zinc'].includes(theme.name),
).map(theme => theme.name)

const COOKIE_NAME = 'user_config'
export type Layout = 'fixed' | 'full'
export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'
export type InstallationType = 'cli' | 'manual'

export const useConfig = createSharedComposable(() => {
  const config = useCookie<{
    layout: Layout
    packageManager: PackageManager
    installationType: InstallationType
    activeTheme: typeof THEMES[number]
  }>(
    COOKIE_NAME,
    {
      default: () => ({ layout: 'full', packageManager: 'pnpm', installationType: 'cli', activeTheme: 'green' }),
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    },
  )

  watchImmediate(() => config.value.layout, (newLayout) => {
    if (!isClient)
      return

    // Remove any existing layout classes
    document.documentElement.classList.remove('layout-fixed', 'layout-full')
    // Add the new layout class
    document.documentElement.classList.add(`layout-${newLayout}`)
  })

  watchImmediate(() => config.value.activeTheme, (activeTheme) => {
    if (!isClient || !activeTheme)
      return

    Array.from(document.body.classList)
      .filter(className => className.startsWith('theme-'))
      .forEach((className) => {
        document.body.classList.remove(className)
      })
    document.body.classList.add(`theme-${activeTheme}`)
    if (activeTheme.endsWith('-scaled')) {
      document.body.classList.add('theme-scaled')
    }
  })

  const isLayoutFull = computed(() => config.value.layout === 'full')

  return {
    config,
    isLayoutFull,
  }
})
