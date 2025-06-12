import { createSharedComposable, isClient, watchImmediate } from '@vueuse/core'

const COOKIE_NAME = 'user_config'
export type Layout = 'fixed' | 'full'
export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

export const useUserConfig = createSharedComposable(() => {
  const userConfig = useCookie<{
    layout: Layout
    packageManager: PackageManager
  }>(
    COOKIE_NAME,
    { default: () => ({ layout: 'full', packageManager: 'pnpm' }), path: '/', maxAge: 31536000, sameSite: 'lax' },
  )

  watchImmediate(() => userConfig.value.layout, (newLayout) => {
    if (!isClient)
      return

    // Remove any existing layout classes
    document.documentElement.classList.remove('layout-fixed', 'layout-full')
    // Add the new layout class
    document.documentElement.classList.add(`layout-${newLayout}`)
  })

  const isLayoutFull = computed(() => userConfig.value.layout === 'full')

  return {
    userConfig,
    isLayoutFull,
  }
})
