import type { ComputedRef, Ref } from "vue"
import { createContext } from "reka-ui"

export type QuestionnaireItemStatus = "unanswered" | "answered" | "skipped"
export type QuestionnaireShortcutMode = "letters" | "numbers"

export type QuestionnaireInputType
  = | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"

export interface QuestionnaireChoiceDefinition {
  disabled?: boolean
  value: string
}

export interface QuestionnaireItemDefinition {
  choices?: readonly QuestionnaireChoiceDefinition[]
  disabled?: boolean
  name: string
  required?: boolean
}

export interface ChoiceRegistration {
  disabled: boolean
  value: string
}

export interface AnswerControlRegistration {
  disabled: boolean
  element: HTMLInputElement
  id: string
  ownDisabled: boolean
  type: "choice" | "input"
  value: string
}

export interface ItemRegistration {
  element: HTMLFieldSetElement
  focus: () => void
  focusInvalid: () => void
  getAnswerByElement: (element: Element) => AnswerControlRegistration | null
  getAnswerByShortcut: (shortcut: string) => AnswerControlRegistration | null
  getChoices: () => ChoiceRegistration[]
  isDisabled: () => boolean
  isRequired: () => boolean
  moveAnswerFocus: (element: Element, direction: "next" | "previous") => boolean
  name: string
  reset: () => void
  skip: () => void
  status: () => QuestionnaireItemStatus
  validate: () => boolean
}

export interface QuestionnaireRootContext {
  activeItem: ComputedRef<ItemRegistration | null>
  activeItemName: ComputedRef<string | null>
  activeItemRequired: ComputedRef<boolean | null>
  activeItemStatus: ComputedRef<QuestionnaireItemStatus | null>
  current: ComputedRef<number>
  domVersion: Ref<number>
  first: ComputedRef<boolean>
  goNext: () => void
  goPrevious: () => void
  itemDefinitionByName: ComputedRef<Map<string, QuestionnaireItemDefinition> | null>
  last: ComputedRef<boolean>
  nativeValidation: ComputedRef<boolean>
  registerItem: (registration: ItemRegistration) => () => void
  shortcuts: ComputedRef<QuestionnaireShortcutMode | null>
  skipCurrent: () => void
  total: ComputedRef<number>
}

export interface QuestionnaireItemContext {
  active: ComputedRef<boolean>
  /** Bumped after a controlled answer interaction so every control re-syncs. */
  controlSyncVersion: Ref<number>
  disabled: ComputedRef<boolean>
  hasInputAnswer: ComputedRef<boolean>
  invalid: ComputedRef<boolean>
  multiple: ComputedRef<boolean>
  name: ComputedRef<string>
  registerAnswerControl: (registration: AnswerControlRegistration) => () => void
  registerAnswerSelection: (answerId: string, defaultSelected: boolean) => () => void
  registerDescription: (descriptionId: string) => () => void
  registerError: (errorId: string) => () => void
  /** Only used when the title does not render as the fieldset legend. */
  registerTitle: (titleId: string) => () => void
  requestControlSync: () => void
  required: ComputedRef<boolean>
  resetVersion: Ref<number>
  selectedAnswerIds: Ref<string[]>
  setAnswerDefault: (answerId: string, defaultSelected: boolean) => void
  setAnswerSelectionFromInteraction: (answerId: string, selected: boolean) => void
  shortcutByAnswerId: ComputedRef<Map<string, string>>
  shortcutByChoiceValue: ComputedRef<Map<string, string> | null>
  shortcuts: ComputedRef<QuestionnaireShortcutMode | null>
  status: ComputedRef<QuestionnaireItemStatus>
  syncControlledAnswerSelection: (answerId: string, selected: boolean) => void
}

export const [injectQuestionnaireRootContext, provideQuestionnaireRootContext]
  = createContext<QuestionnaireRootContext>("Questionnaire")

export const [injectQuestionnaireItemContext, provideQuestionnaireItemContext]
  = createContext<QuestionnaireItemContext>("QuestionnaireItem")

export function hasInputValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.some(item => String(item).trim().length > 0)
  }

  return value !== undefined && value !== null && String(value).trim().length > 0
}

export function getShortcutKeys(shortcuts: QuestionnaireShortcutMode | null) {
  if (shortcuts === "letters") {
    return Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index))
  }

  if (shortcuts === "numbers") {
    return Array.from({ length: 9 }, (_, index) => String(index + 1))
  }

  return []
}

export function getShortcutFromKey(key: string, shortcuts: QuestionnaireShortcutMode) {
  const normalizedKey = shortcuts === "letters" ? key.toUpperCase() : key

  return getShortcutKeys(shortcuts).includes(normalizedKey) ? normalizedKey : null
}

export function getAnswerKeyShortcuts(shortcut: string | null, filled: boolean) {
  return [shortcut, filled ? "Enter" : null].filter(Boolean).join(" ") || undefined
}

export function isAnswerFilled(answer: AnswerControlRegistration) {
  if (answer.type === "choice") {
    return answer.element.checked
  }

  return answer.element.hasAttribute("name") && hasInputValue(answer.element.value)
}

export function isEmptyNavigableInput(answer: AnswerControlRegistration | null) {
  return (
    answer?.type === "input"
    && ["email", "password", "search", "tel", "text", "url"].includes(answer.element.type)
    && !hasInputValue(answer.element.value)
  )
}

export function isTextEntryTarget(element: Element) {
  if (element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
    return true
  }

  if (element instanceof HTMLInputElement) {
    return !["button", "checkbox", "radio", "reset", "submit"].includes(element.type)
  }

  return element instanceof HTMLElement && element.isContentEditable
}

export function isRadioTarget(element: Element) {
  return element instanceof HTMLInputElement && element.type === "radio"
}

/**
 * Sort registrations by the position of their element in the document, so that
 * navigation always follows the rendered order instead of the mount order.
 */
export function compareDocumentOrder(first: Element, second: Element) {
  if (first === second) {
    return 0
  }

  const position = first.compareDocumentPosition(second)

  if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
    return -1
  }

  if (position & Node.DOCUMENT_POSITION_PRECEDING) {
    return 1
  }

  return 0
}

export interface QuestionnaireCollection {
  enabledItems: QuestionnaireItemDefinition[]
  itemByName: Map<string, QuestionnaireItemDefinition>
  items: readonly QuestionnaireItemDefinition[]
}

export function createQuestionnaireCollection(
  items: readonly QuestionnaireItemDefinition[] | undefined,
): QuestionnaireCollection | null {
  if (items === undefined) {
    return null
  }

  return {
    enabledItems: items.filter(item => !item.disabled),
    itemByName: new Map(items.map(item => [item.name, item])),
    items,
  }
}

export function getInitialItemName(
  collection: QuestionnaireCollection | null,
  defaultItem: string | undefined,
) {
  if (!collection) {
    return defaultItem ?? null
  }

  const defaultDefinition = defaultItem ? collection.itemByName.get(defaultItem) : undefined

  if (defaultDefinition && !defaultDefinition.disabled) {
    return defaultDefinition.name
  }

  return collection.enabledItems[0]?.name ?? null
}

/**
 * Map every enabled choice of an item definition to a keyboard shortcut, so
 * that shortcuts stay stable regardless of how choices are rendered.
 */
export function getShortcutByChoiceValue(
  item: QuestionnaireItemDefinition | undefined,
  shortcuts: QuestionnaireShortcutMode | null,
) {
  const shortcutByChoiceValue = new Map<string, string>()

  if (!item || !shortcuts) {
    return shortcutByChoiceValue
  }

  const keys = getShortcutKeys(shortcuts)
  let shortcutIndex = 0

  for (const choice of item.choices ?? []) {
    if (choice.disabled) {
      continue
    }

    const shortcut = keys[shortcutIndex]

    if (!shortcut) {
      break
    }

    shortcutByChoiceValue.set(choice.value, shortcut)
    shortcutIndex += 1
  }

  return shortcutByChoiceValue
}
