import type { TemplateRef } from 'vue'
import { onMounted, onUnmounted, watch } from 'vue'

export function useMutationObserver(
  target: TemplateRef<any>,
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  },
) {
  let observer: MutationObserver | null = null

  onMounted(() => {
    if (target.value?.$el) {
      observer = new MutationObserver(callback)
      observer.observe(target.value.$el, options)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  watch(target, (newTarget) => {
    observer?.disconnect()
    if (newTarget?.$el) {
      observer = new MutationObserver(callback)
      observer.observe(newTarget.$el, options)
    }
  })
}
