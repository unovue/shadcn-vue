import { onMounted, onUnmounted, ref } from 'vue'

const open = ref(false)

function setOpen(next: boolean) {
  open.value = next
}

function isEditableTarget(target: EventTarget | null) {
  return (
    (target instanceof HTMLElement && target.isContentEditable)
    || target instanceof HTMLInputElement
    || target instanceof HTMLTextAreaElement
    || target instanceof HTMLSelectElement
  )
}

export function useOpenPreset() {
  function handleKeyDown(event: KeyboardEvent) {
    if (
      event.key === 'o'
      && !event.shiftKey
      && !event.metaKey
      && !event.ctrlKey
      && !event.altKey
    ) {
      if (isEditableTarget(event.target))
        return

      event.preventDefault()
      setOpen(true)
    }
  }

  onMounted(() => window.addEventListener('keydown', handleKeyDown))
  onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))

  return {
    open,
    setOpen,
  }
}

export function useOpenPresetTrigger() {
  return {
    openPreset: () => setOpen(true),
  }
}
