<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type {
  ItemRegistration,
  QuestionnaireItemDefinition,
  QuestionnaireShortcutMode,
} from "./useQuestionnaire"
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from "vue"
import { cn } from "@/lib/utils"
import {
  compareDocumentOrder,
  createQuestionnaireCollection,
  getInitialItemName,
  getShortcutFromKey,
  isAnswerFilled,
  isRadioTarget,
  isTextEntryTarget,
  provideQuestionnaireRootContext,
} from "./useQuestionnaire"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** Item shown first. Ignored when `item` is provided. */
  defaultItem?: string
  /** Controlled active item. Use with `v-model:item`. */
  item?: string
  /** Declares the item order, and the choice order shortcuts are assigned in. */
  items?: readonly QuestionnaireItemDefinition[]
  /** Set to `false` to run native constraint validation on answered items. */
  noValidate?: boolean
  /** Assigns a keyboard shortcut to every choice. */
  shortcuts?: QuestionnaireShortcutMode
}>(), {
  noValidate: true,
})

const emits = defineEmits<{
  "reset": [event: Event]
  "submit": [event: Event]
  "update:item": [item: string]
}>()

interface PendingFocus {
  name: string
  target: "invalid" | "item"
}

const rootElement = ref<HTMLFormElement | null>(null)
const registrations = shallowRef<ItemRegistration[]>([])
const domVersion = ref(0)
const pendingFocus = shallowRef<PendingFocus | null>(null)

const collection = computed(() => createQuestionnaireCollection(props.items))
const uncontrolledItem = ref<string | null>(
  getInitialItemName(collection.value, props.defaultItem),
)
const controlled = computed(() => props.item !== undefined)
const activeItemName = computed(() => (controlled.value ? props.item! : uncontrolledItem.value))
const shortcuts = computed(() => props.shortcuts ?? null)
const nativeValidation = computed(() => props.noValidate === false)

let previousActiveItemName = activeItemName.value

const runtimeItems = computed(() => {
  // Re-sort whenever items are added to or removed from the DOM.
  void domVersion.value

  return registrations.value
    .filter(registration => !registration.isDisabled())
    .sort((first, second) => compareDocumentOrder(first.element, second.element))
})
const runtimeItemByName = computed(
  () => new Map(runtimeItems.value.map(runtimeItem => [runtimeItem.name, runtimeItem])),
)
/** `items` is authoritative when provided, so items can be declared before they render. */
const logicalItems = computed<readonly { name: string }[]>(
  () => collection.value?.enabledItems ?? runtimeItems.value,
)
const currentIndex = computed(
  () => logicalItems.value.findIndex(logicalItem => logicalItem.name === activeItemName.value),
)
const activeItem = computed(() => {
  if (currentIndex.value < 0 || !activeItemName.value) {
    return null
  }

  return runtimeItemByName.value.get(activeItemName.value) ?? null
})
const activeDefinition = computed(() =>
  activeItemName.value ? collection.value?.itemByName.get(activeItemName.value) : undefined,
)
const activeItemRequired = computed(() => {
  if (currentIndex.value < 0) {
    return null
  }

  return activeDefinition.value
    ? Boolean(activeDefinition.value.required)
    : (activeItem.value?.isRequired() ?? false)
})
const activeItemStatus = computed(() => {
  if (currentIndex.value < 0) {
    return null
  }

  return activeItem.value?.status() ?? (activeItemName.value ? "unanswered" : null)
})
const orderedRegistrations = computed(() => {
  if (!collection.value) {
    return runtimeItems.value
  }

  return collection.value.enabledItems.flatMap((definition) => {
    const registration = runtimeItemByName.value.get(definition.name)

    return registration ? [registration] : []
  })
})
const total = computed(() => logicalItems.value.length)
const current = computed(() => (currentIndex.value < 0 ? 0 : currentIndex.value + 1))
const first = computed(() => total.value > 0 && currentIndex.value === 0)
const last = computed(() => total.value > 0 && currentIndex.value === total.value - 1)

function setItem(nextItem: string, focusTarget: PendingFocus["target"] = "item") {
  if (nextItem === activeItemName.value) {
    return
  }

  pendingFocus.value = { name: nextItem, target: focusTarget }

  if (!controlled.value) {
    uncontrolledItem.value = nextItem
  }

  emits("update:item", nextItem)
}

function registerItem(registration: ItemRegistration) {
  registrations.value = [
    ...registrations.value.filter(
      current => current.element !== registration.element && current.name !== registration.name,
    ),
    registration,
  ]

  return () => {
    registrations.value = registrations.value.filter(current => current !== registration)
  }
}

function setItemAt(index: number, focusTarget: PendingFocus["target"] = "item") {
  const nextItem = logicalItems.value[index]

  if (nextItem) {
    setItem(nextItem.name, focusTarget)
  }
}

function goPrevious() {
  if (currentIndex.value <= 0) {
    return
  }

  setItemAt(currentIndex.value - 1)
}

function goNext() {
  if (!activeItem.value || currentIndex.value >= total.value - 1) {
    return
  }

  if (!activeItem.value.validate()) {
    activeItem.value.focusInvalid()
    return
  }

  setItemAt(currentIndex.value + 1)
}

function confirmCurrent() {
  if (!activeItem.value) {
    return
  }

  if (!activeItem.value.validate()) {
    activeItem.value.focusInvalid()
    return
  }

  if (last.value) {
    rootElement.value?.requestSubmit()
    return
  }

  setItemAt(currentIndex.value + 1)
}

function skipCurrent() {
  if (!activeItem.value || activeItem.value.isRequired()) {
    return
  }

  activeItem.value.skip()

  if (!last.value) {
    setItemAt(currentIndex.value + 1)
    return
  }

  queueMicrotask(() => {
    rootElement.value?.requestSubmit()
  })
}

function handleReset(event: Event) {
  emits("reset", event)

  if (event.defaultPrevented) {
    return
  }

  for (const registration of registrations.value) {
    registration.reset()
  }

  const resetItemName = collection.value
    ? getInitialItemName(collection.value, props.defaultItem)
    : (runtimeItems.value.find(registration => registration.name === props.defaultItem)?.name
      ?? runtimeItems.value[0]?.name)

  if (resetItemName) {
    setItem(resetItemName)
  }
}

function handleSubmit(event: Event) {
  const firstInvalidItem = orderedRegistrations.value.find(registration => !registration.validate())

  if (firstInvalidItem) {
    event.preventDefault()
    setItem(firstInvalidItem.name, "invalid")

    if (firstInvalidItem.name === activeItemName.value) {
      firstInvalidItem.focusInvalid()
      pendingFocus.value = null
    }

    return
  }

  emits("submit", event)
}

function handleKeydown(event: KeyboardEvent) {
  if (
    event.defaultPrevented
    || event.isComposing
    || event.keyCode === 229
    || !activeItem.value
    || !(event.target instanceof Element)
  ) {
    return
  }

  if (event.key === "Enter" && (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey) {
    event.preventDefault()

    if (!event.repeat) {
      confirmCurrent()
    }

    return
  }

  if (event.metaKey || event.ctrlKey || event.altKey) {
    return
  }

  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    const moved = activeItem.value.moveAnswerFocus(
      event.target,
      event.key === "ArrowDown" ? "next" : "previous",
    )

    if (moved) {
      event.preventDefault()
      return
    }
  }

  if (
    (event.key === "ArrowLeft" || event.key === "ArrowRight")
    && !isTextEntryTarget(event.target)
    && !isRadioTarget(event.target)
  ) {
    event.preventDefault()

    if (event.repeat) {
      return
    }

    if (event.key === "ArrowLeft") {
      goPrevious()
    }
    else if (activeItem.value.status() !== "unanswered") {
      goNext()
    }

    return
  }

  if (event.key === "Enter") {
    const answer = activeItem.value.getAnswerByElement(event.target)

    if (!answer) {
      return
    }

    event.preventDefault()

    if (!event.repeat && isAnswerFilled(answer)) {
      confirmCurrent()
    }

    return
  }

  if (!shortcuts.value || isTextEntryTarget(event.target)) {
    return
  }

  const shortcut = getShortcutFromKey(event.key, shortcuts.value)
  const answer = shortcut ? activeItem.value.getAnswerByShortcut(shortcut) : null

  if (!answer) {
    return
  }

  event.preventDefault()

  if (event.repeat) {
    return
  }

  answer.element.focus()

  if (answer.type === "choice") {
    answer.element.click()
  }
}

watch(
  () => [activeItemName.value, currentIndex.value, total.value, activeItem.value] as const,
  () => {
    if (total.value === 0) {
      return
    }

    if (currentIndex.value < 0) {
      const firstItem = logicalItems.value[0]

      if (!firstItem) {
        return
      }

      if (!controlled.value && activeItemName.value === null) {
        uncontrolledItem.value = firstItem.name
        return
      }

      setItem(firstItem.name)
      return
    }

    const focus = pendingFocus.value
    const activeItemChanged = previousActiveItemName !== activeItemName.value

    previousActiveItemName = activeItemName.value

    if (!focus || focus.name !== activeItemName.value) {
      if (controlled.value && activeItemChanged) {
        pendingFocus.value = null
        activeItem.value?.focus()
      }

      return
    }

    if (focus.target === "invalid") {
      activeItem.value?.focusInvalid()
    }
    else {
      activeItem.value?.focus()
    }

    pendingFocus.value = null
  },
  { flush: "post", immediate: true },
)

let observer: MutationObserver | null = null

onMounted(() => {
  if (!rootElement.value || typeof MutationObserver === "undefined") {
    return
  }

  observer = new MutationObserver(() => {
    domVersion.value += 1
  })

  observer.observe(rootElement.value, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})

provideQuestionnaireRootContext({
  activeItem,
  activeItemName,
  activeItemRequired,
  activeItemStatus,
  current,
  domVersion,
  first,
  goNext,
  goPrevious,
  itemDefinitionByName: computed(() => collection.value?.itemByName ?? null),
  last,
  nativeValidation,
  registerItem,
  shortcuts,
  skipCurrent,
  total,
})
</script>

<template>
  <form
    ref="rootElement"
    data-slot="questionnaire"
    :data-shortcuts="shortcuts ?? undefined"
    :novalidate="props.noValidate"
    :class="cn('gap-6 flex w-full min-w-0 flex-col', props.class)"
    @keydown="handleKeydown"
    @reset="handleReset"
    @submit="handleSubmit"
  >
    <slot :current="current" :first="first" :last="last" :total="total" />
  </form>
</template>
