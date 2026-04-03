import { createSharedComposable } from '@vueuse/core'
import { DEFAULT_CONFIG } from '@/registry/config'

export const useReset = createSharedComposable(() => {
  const showResetDialog = ref(false)
  const params = useDesignSystemSearchParams()

  function confirmReset() {
    params.style.value = DEFAULT_CONFIG.style
    params.baseColor.value = DEFAULT_CONFIG.baseColor
    params.theme.value = DEFAULT_CONFIG.theme
    params.font.value = DEFAULT_CONFIG.font
    params.fontHeading.value = 'inherit'
    params.chartColor.value = ''
    params.iconLibrary.value = DEFAULT_CONFIG.iconLibrary
    params.radius.value = 'default'
    params.menuColor.value = DEFAULT_CONFIG.menuColor
    params.menuAccent.value = DEFAULT_CONFIG.menuAccent
    params.custom.value = false
    showResetDialog.value = false
  }

  return {
    showResetDialog,
    confirmReset,
  }
})
