<script setup lang="ts">
import type { Component, ComponentPublicInstance, HTMLAttributes } from "vue"
import { cn } from "cn"
import { computed, ref, toRef, watch } from "vue"
import { getElement, getNextSelection, isEqual, provideTagsInputRootContext } from "."

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes["class"]
  modelValue?: any[] | null
  defaultValue?: any[]
  /** Adds the tags of a pasted text, split at `delimiter`. */
  addOnPaste?: boolean
  addOnTab?: boolean
  addOnBlur?: boolean
  duplicate?: boolean
  disabled?: boolean
  delimiter?: string | RegExp
  dir?: "ltr" | "rtl"
  /** 0 means no limit. */
  max?: number
  /** The `id` of the text input. */
  id?: string
  convertValue?: (value: string) => any
  displayValue?: (value: any) => string
  name?: string
}>(), {
  as: "div",
  defaultValue: () => [],
  delimiter: ",",
  max: 0,
  displayValue: (value: any) => value.toString(),
})

const emits = defineEmits<{
  "update:modelValue": [value: any[]]
  "invalid": [payload: any]
  "addTag": [payload: any]
  "removeTag": [payload: any]
}>()

// The tags change at once, so more than one change in a tick, such as a paste, all count.
const localValue = ref<any[]>([...(props.modelValue ?? props.defaultValue)])
const modelValue = computed<any[]>({
  get: () => localValue.value,
  set: (value) => {
    localValue.value = value
    emits("update:modelValue", value)
  },
})

watch(() => props.modelValue, (value) => {
  if (value !== undefined) {
    localValue.value = value ?? []
  }
}, { deep: true })

const rootElement = ref<ComponentPublicInstance | HTMLElement | null>(null)
const selectedElement = ref<HTMLElement>()
const isInvalidInput = ref(false)
const focused = ref(false)
const items = new Map<HTMLElement, () => any>()

function direction() {
  const element = getElement(rootElement.value)

  return props.dir ?? (element && getComputedStyle(element).direction === "rtl" ? "rtl" : "ltr")
}

function getItems() {
  return Array.from(items.keys())
    .filter(element => element.dataset.disabled !== "")
    .sort((first, second) => first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
}

function removeTag(index: number) {
  if (index === -1) {
    return
  }

  const removed = modelValue.value[index]

  modelValue.value = modelValue.value.filter((_, position) => position !== index)
  emits("removeTag", removed)
}

function addTag(typed: any) {
  const current = [...modelValue.value]

  if (current.some(tag => typeof tag === "object" && tag !== null) && typeof props.convertValue !== "function") {
    throw new TypeError("`convertValue` is required when the tags are objects.")
  }

  const payload = props.convertValue ? props.convertValue(typed) : typed

  if (props.max && current.length >= props.max) {
    emits("invalid", payload)
    return false
  }

  if (props.duplicate || !current.some(tag => isEqual(tag, payload))) {
    modelValue.value = [...current, payload]
    emits("addTag", payload)
    return true
  }

  isInvalidInput.value = true
  emits("invalid", payload)
  return false
}

function onInputKeydown(event: KeyboardEvent) {
  if (event.isComposing) {
    return
  }

  const target = event.target as HTMLInputElement
  const collection = getItems()
  const lastTag = collection.at(-1)

  if (!lastTag) {
    return
  }

  switch (event.key) {
    case "Delete":
    case "Backspace": {
      if (target.selectionStart !== 0 || target.selectionEnd !== 0) {
        break
      }

      if (selectedElement.value) {
        const index = collection.indexOf(selectedElement.value)
        const value = items.get(selectedElement.value)?.()

        removeTag(modelValue.value.findIndex(tag => isEqual(tag, value)))
        selectedElement.value = selectedElement.value === lastTag
          ? (index > 0 ? collection[index - 1] : undefined)
          : collection[index + 1]
        event.preventDefault()
      }
      else if (event.key === "Backspace") {
        selectedElement.value = lastTag
        event.preventDefault()
      }
      break
    }
    case "Home":
    case "End":
    case "ArrowRight":
    case "ArrowLeft": {
      if (target.selectionStart !== 0 || target.selectionEnd !== 0) {
        break
      }

      const dir = direction()
      const isArrowRight = (event.key === "ArrowRight" && dir === "ltr") || (event.key === "ArrowLeft" && dir === "rtl")

      if (!isArrowRight && !selectedElement.value) {
        selectedElement.value = lastTag
        event.preventDefault()
      }
      else if (isArrowRight && selectedElement.value === lastTag) {
        selectedElement.value = undefined
        event.preventDefault()
      }
      else if (selectedElement.value) {
        selectedElement.value = getNextSelection(event.key, selectedElement.value, collection, dir)
        event.preventDefault()
      }
      break
    }
    case "ArrowUp":
    case "ArrowDown": {
      if (selectedElement.value) {
        event.preventDefault()
      }
      break
    }
    default:
      selectedElement.value = undefined
  }
}

provideTagsInputRootContext({
  modelValue,
  onAddValue: addTag,
  onRemoveValue: removeTag,
  onInputKeydown,
  registerItem(element, value) {
    items.set(element, value)

    return () => {
      items.delete(element)
    }
  },
  selectedElement,
  isInvalidInput,
  addOnPaste: toRef(props, "addOnPaste"),
  addOnBlur: toRef(props, "addOnBlur"),
  addOnTab: toRef(props, "addOnTab"),
  disabled: toRef(props, "disabled"),
  delimiter: toRef(props, "delimiter"),
  id: toRef(props, "id"),
  displayValue: props.displayValue,
})

function onFocusout(event: FocusEvent) {
  if (!getElement(rootElement.value)?.contains(event.relatedTarget as Node | null)) {
    focused.value = false
  }
}
</script>

<template>
  <component
    :is="as"
    ref="rootElement"
    data-slot="tags-input"
    :dir="props.dir"
    :data-invalid="isInvalidInput ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-focused="focused ? '' : undefined"
    :class="cn(
      'flex flex-wrap gap-2 items-center rounded-md border border-input bg-background px-2 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none',
      'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-3',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      props.class)"
    @focusin="focused = true"
    @focusout="onFocusout"
  >
    <slot :model-value="modelValue" />
    <template v-if="name">
      <input
        v-for="(tag, index) in modelValue"
        :key="index"
        type="hidden"
        :name="name"
        :value="typeof tag === 'object' ? JSON.stringify(tag) : tag"
        :disabled="disabled"
      >
    </template>
  </component>
</template>
