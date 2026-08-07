/**
 * Single-key shortcuts must not fire while the user is typing. Shared by every
 * typeset keydown handler (and by the scripts injected into the preview iframe).
 */
export function isEditableTarget(target: EventTarget | null) {
  return (
    (target instanceof HTMLElement && target.isContentEditable)
    || target instanceof HTMLInputElement
    || target instanceof HTMLTextAreaElement
    || target instanceof HTMLSelectElement
  )
}
