import { useEventListener } from '@vueuse/core'
import { isEditableTarget } from '@/lib/typeset/keyboard'
import {
  parseTypesetSnapshot,
  TYPESET_PARAM_KEYS,
} from '@/lib/typeset/params'

/**
 * Undo/redo for the designer.
 *
 * The browser's own history is not usable here: every picker interaction writes
 * with `replace` (see useTypesetSearchParams), so there is nothing to pop. This
 * keeps its own stack of URL snapshots instead.
 *
 * Pass `record: true` from the owning page — exactly one caller must set up the
 * recording watcher and the keyboard shortcuts. Every other caller gets the
 * shared state and the actions.
 */
export function useTypesetHistory({ record = false } = {}) {
  const route = useRoute()
  const { setParams } = useTypesetSearchParams()

  const entries = useState<string[]>('typeset-history-entries', () => [])
  const index = useState('typeset-history-index', () => 0)
  const maxIndex = useState('typeset-history-max-index', () => 0)

  // Set while restoring, so the snapshot watcher does not record the change it
  // just made as a new entry.
  const isRestoring = useState('typeset-history-restoring', () => false)

  const canGoBack = computed(() => index.value > 0)
  const canGoForward = computed(() => index.value < maxIndex.value)

  // A history entry is a snapshot of every typeset param read from the settled
  // URL. Absent keys snapshot as null so restoring clears them back to their
  // default.
  const snapshot = computed(() => JSON.stringify(
    Object.fromEntries(
      TYPESET_PARAM_KEYS.map((key) => {
        const value = route.query[key]
        return [key, typeof value === 'string' ? value : null]
      }),
    ),
  ))

  function restore(entry: string | undefined) {
    if (entry === undefined) {
      return
    }
    isRestoring.value = true
    setParams(parseTypesetSnapshot(entry))
  }

  function goBack() {
    if (index.value <= 0) {
      return
    }
    index.value -= 1
    restore(entries.value[index.value])
  }

  function goForward() {
    if (index.value >= maxIndex.value) {
      return
    }
    index.value += 1
    restore(entries.value[index.value])
  }

  if (record) {
    watch(snapshot, (next) => {
      // Seed the stack with the first snapshot (no undo available yet).
      if (entries.value.length === 0) {
        entries.value = [next]
        return
      }

      if (isRestoring.value) {
        isRestoring.value = false
        return
      }

      if (next === entries.value[index.value]) {
        return
      }

      // A new change after undoing discards the redo tail.
      entries.value = [...entries.value.slice(0, index.value + 1), next]
      index.value = entries.value.length - 1
      maxIndex.value = index.value
    }, { immediate: true })

    useEventListener(globalThis.document, 'keydown', (event: KeyboardEvent) => {
      if (!event.metaKey && !event.ctrlKey) {
        return
      }
      if (isEditableTarget(event.target)) {
        return
      }

      const key = event.key.toLowerCase()
      if ((key === 'z' && event.shiftKey) || (key === 'y' && event.ctrlKey)) {
        event.preventDefault()
        goForward()
        return
      }
      if (key === 'z') {
        event.preventDefault()
        goBack()
      }
    })
  }

  return { canGoBack, canGoForward, goBack, goForward }
}
