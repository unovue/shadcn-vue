import { createSharedComposable, isClient, watchImmediate } from '@vueuse/core'

const COOKIE_NAME = 'user_config'
export type Layout = 'fixed' | 'full'
export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'
export type InstallationType = 'cli' | 'manual'

export const useConfig = createSharedComposable(() => {
  const config = useCookie<{
    layout: Layout
    packageManager: PackageManager
    installationType: InstallationType
  }>(
    COOKIE_NAME,
    { default: () => ({ layout: 'full', packageManager: 'pnpm', installationType: 'cli' }), path: '/', maxAge: 31536000, sameSite: 'lax' },
  )

  watchImmediate(() => config.value.layout, (newLayout) => {
    if (!isClient)
      return

    // Remove any existing layout classes
    document.documentElement.classList.remove('layout-fixed', 'layout-full')
    // Add the new layout class
    document.documentElement.classList.add(`layout-${newLayout}`)
  })

  const isLayoutFull = computed(() => config.value.layout === 'full')

  return {
    config,
    isLayoutFull,
  }
})
