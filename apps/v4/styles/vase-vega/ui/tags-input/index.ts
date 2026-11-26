import type { InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

export { default as TagsInput } from './TagsInput.vue'
export { default as TagsInputInput } from './TagsInputInput.vue'
export { default as TagsInputItem } from './TagsInputItem.vue'
export { default as TagsInputItemDelete } from './TagsInputItemDelete.vue'
export { default as TagsInputItemText } from './TagsInputItemText.vue'

export interface TagsInputRootContext {
  modelValue: Ref<any[]>
  /** Returns `false` when the tag is a duplicate or past `max`. */
  onAddValue: (payload: any) => boolean
  onRemoveValue: (index: number) => void
  onInputKeydown: (event: KeyboardEvent) => void
  registerItem: (element: HTMLElement, value: () => any) => () => void
  selectedElement: Ref<HTMLElement | undefined>
  isInvalidInput: Ref<boolean>
  addOnPaste: Readonly<Ref<boolean>>
  addOnBlur: Readonly<Ref<boolean>>
  addOnTab: Readonly<Ref<boolean>>
  disabled: Readonly<Ref<boolean>>
  delimiter: Readonly<Ref<string | RegExp>>
  id: Readonly<Ref<string | undefined>>
  displayValue: (value: any) => string
}

export interface TagsInputItemContext {
  value: Readonly<Ref<any>>
  isSelected: Readonly<Ref<boolean>>
  disabled: Readonly<Ref<boolean>>
  displayValue: Readonly<Ref<string>>
  textId: Ref<string | undefined>
}

const rootContextKey: InjectionKey<TagsInputRootContext> = Symbol('TagsInput')
const itemContextKey: InjectionKey<TagsInputItemContext> = Symbol('TagsInputItem')

export function provideTagsInputRootContext(context: TagsInputRootContext) {
  provide(rootContextKey, context)
  return context
}

export function injectTagsInputRootContext() {
  const context = inject(rootContextKey, null)

  if (!context) {
    throw new Error('`TagsInput` parts must be used inside `TagsInput`.')
  }

  return context
}

export function provideTagsInputItemContext(context: TagsInputItemContext) {
  provide(itemContextKey, context)
  return context
}

export function injectTagsInputItemContext() {
  const context = inject(itemContextKey, null)

  if (!context) {
    throw new Error('`TagsInputItem` parts must be used inside `TagsInputItem`.')
  }

  return context
}

export function isEqual(first: unknown, second: unknown) {
  if (first === second) {
    return true
  }

  if (typeof first === 'object' && typeof second === 'object' && first !== null && second !== null) {
    return JSON.stringify(first) === JSON.stringify(second)
  }

  return false
}

export function getNextSelection(
  key: string,
  current: HTMLElement,
  items: HTMLElement[],
  dir: 'ltr' | 'rtl',
) {
  const index = items.indexOf(current)

  if (key === 'Home') {
    return items[0]
  }

  if (key === 'End') {
    return items.at(-1)
  }

  const forward = (key === 'ArrowRight') === (dir === 'ltr')

  return items[Math.min(Math.max(index + (forward ? 1 : -1), 0), items.length - 1)]
}

export function getElement(target: unknown): HTMLElement | null {
  const element = (target as { $el?: unknown } | null)?.$el ?? target

  return element instanceof HTMLElement ? element : null
}
