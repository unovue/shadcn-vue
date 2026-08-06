import { useEventListener } from '@vueuse/core'
import { isEditableTarget } from '@/lib/typeset/keyboard'

/**
 * Light/dark toggle for the designer.
 *
 * `shortcut: false` gives callers that only need the action (the preview's
 * command handler) the toggle without a second D listener.
 */
export function useTypesetThemeToggle({ shortcut = true } = {}) {
  const colorMode = useColorMode()

  function toggleTheme() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }

  if (shortcut) {
    useEventListener(globalThis.document, 'keydown', (event: KeyboardEvent) => {
      if (event.key !== 'd' && event.key !== 'D') {
        return
      }
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }
      if (isEditableTarget(event.target)) {
        return
      }
      event.preventDefault()
      toggleTheme()
    })
  }

  return { toggleTheme }
}
