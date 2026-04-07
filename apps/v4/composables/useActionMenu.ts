import { createSharedComposable } from '@vueuse/core'

export const useActionMenu = createSharedComposable(() => {
  const open = ref(false)

  function openActionMenu() {
    open.value = true
  }

  return {
    open,
    openActionMenu,
  }
})
