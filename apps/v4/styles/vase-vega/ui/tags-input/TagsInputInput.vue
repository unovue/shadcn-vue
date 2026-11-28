<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { nextTick, onMounted, ref } from 'vue'
import { injectTagsInputRootContext } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  autoFocus?: boolean
  maxLength?: number
}>()

const context = injectTagsInputRootContext()

const inputElement = ref<HTMLInputElement | null>(null)
let composing = false

function handleBlur(event: FocusEvent) {
  context.selectedElement.value = undefined

  if (!context.addOnBlur.value) {
    return
  }

  const target = event.target as HTMLInputElement
  const controlledId = target.getAttribute('aria-controls')

  // A click on the list that the input controls is not a blur of the field.
  if (controlledId && (event.relatedTarget as HTMLElement | null)?.closest(`#${CSS.escape(controlledId)}`)) {
    return
  }

  if (target.value && context.onAddValue(target.value)) {
    target.value = ''
  }
}

async function handleKey(event: KeyboardEvent, preventImplicitSubmit: boolean) {
  if (composing) {
    return
  }

  let preventedByOthers = event.defaultPrevented
  const preventDefault = event.preventDefault.bind(event)

  event.preventDefault = () => {
    preventedByOthers = true
    preventDefault()
  }

  const target = event.target as HTMLInputElement

  // Enter in a form submits it, so keep the text for the tag.
  if (preventImplicitSubmit && target.value && !preventedByOthers) {
    preventDefault()
  }

  // Let other handlers of the same key, such as a suggestion list, prevent the tag.
  await nextTick()

  if (preventedByOthers || !target.value) {
    return
  }

  if (context.onAddValue(target.value)) {
    target.value = ''
  }

  preventDefault()
}

function handleTab(event: KeyboardEvent) {
  if (context.addOnTab.value) {
    return handleKey(event, false)
  }
}

function handleInput(event: Event) {
  if (composing) {
    return
  }

  context.isInvalidInput.value = false

  const { data } = event as InputEvent

  if (data === null) {
    return
  }

  const delimiter = context.delimiter.value
  const matchesDelimiter = delimiter === data || (delimiter instanceof RegExp && delimiter.test(data))

  if (!matchesDelimiter) {
    return
  }

  const target = event.target as HTMLInputElement

  target.value = target.value.replace(delimiter, '')

  if (target.value.trim() === '') {
    target.value = ''
    return
  }

  if (context.onAddValue(target.value)) {
    target.value = ''
  }
}

function handlePaste(event: ClipboardEvent) {
  if (!context.addOnPaste.value) {
    return
  }

  event.preventDefault()

  const text = event.clipboardData?.getData('text')

  if (text === undefined) {
    return
  }

  if (context.delimiter.value) {
    text.split(context.delimiter.value).forEach(value => context.onAddValue(value))
  }
  else {
    context.onAddValue(text)
  }
}

function handleCompositionStart() {
  composing = true
}

function handleCompositionEnd() {
  // Safari sends the key that ends a composition after `compositionend`.
  requestAnimationFrame(() => {
    composing = false
  })
}

onMounted(() => {
  if (props.autoFocus) {
    setTimeout(() => inputElement.value?.focus(), 1)
  }
})
</script>

<template>
  <input
    :id="context.id.value"
    ref="inputElement"
    data-slot="tags-input-input"
    type="text"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    :maxlength="maxLength"
    :disabled="context.disabled.value"
    :data-invalid="context.isInvalidInput.value ? '' : undefined"
    :class="cn('text-sm min-h-5 focus:outline-none flex-1 bg-transparent px-1', props.class)"
    @input="handleInput"
    @keydown.enter="handleKey($event, true)"
    @keydown.tab="handleTab"
    @keydown="context.onInputKeydown"
    @blur="handleBlur"
    @compositionstart="handleCompositionStart"
    @compositionend="handleCompositionEnd"
    @paste="handlePaste"
  >
</template>
