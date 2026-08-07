<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { QuestionnaireInputType } from "./useQuestionnaire"
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from "vue"
import { cn } from "@/lib/utils"
import {
  getAnswerKeyShortcuts,
  hasInputValue,
  injectQuestionnaireItemContext,
} from "./useQuestionnaire"

defineOptions({
  // The wrapper is the root element, so attributes have to reach the input.
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** Fills the answer on mount and after a native form reset. */
  defaultValue?: string | number
  disabled?: boolean
  /** Controlled value. Use with `v-model`. */
  modelValue?: string | number
  type?: QuestionnaireInputType
}>(), {
  disabled: false,
  type: "text",
})

const emits = defineEmits<{
  "update:modelValue": [value: string]
}>()

const item = injectQuestionnaireItemContext()

const answerId = useId()
const inputElement = ref<HTMLInputElement | null>(null)
const initialDefaultFilled = hasInputValue(props.defaultValue)
const uncontrolledValue = ref(String(props.defaultValue ?? ""))

const controlled = computed(() => props.modelValue !== undefined)
const defaultFilled = computed(() => hasInputValue(props.defaultValue))
const disabled = computed(() => item.disabled.value || props.disabled)
// Vue re-applies `value` on every render, so the input always renders the value
// the questionnaire owns instead of an undefined binding that would clear it.
const value = computed(() =>
  controlled.value ? String(props.modelValue ?? "") : uncontrolledValue.value)
const filled = computed(() => hasInputValue(value.value))
const selected = computed(() => item.selectedAnswerIds.value.includes(answerId))

function syncValueElement() {
  if (inputElement.value && inputElement.value.value !== value.value) {
    inputElement.value.value = value.value
  }
}

function handleInput(event: Event) {
  const nextValue = (event.target as HTMLInputElement).value

  emits("update:modelValue", nextValue)

  if (controlled.value) {
    // The host owns the value, so restore whatever it kept.
    nextTick(syncValueElement)
    return
  }

  uncontrolledValue.value = nextValue
  item.setAnswerSelectionFromInteraction(answerId, hasInputValue(nextValue))
}

const unregisterSelection = item.registerAnswerSelection(answerId, initialDefaultFilled)

let unregisterControl: (() => void) | null = null

watch([inputElement, disabled, () => props.disabled], ([element]) => {
  unregisterControl?.()
  unregisterControl = null

  if (!element) {
    return
  }

  unregisterControl = item.registerAnswerControl({
    disabled: disabled.value,
    element,
    id: answerId,
    ownDisabled: props.disabled,
    type: "input",
    value: "",
  })
}, { flush: "post" })

watch(defaultFilled, (nextDefaultFilled) => {
  item.setAnswerDefault(answerId, nextDefaultFilled)
})

// Watching the value as well as `filled` lets a host update clear the skipped
// state even when the answer stays filled.
watch([value, filled], () => {
  if (controlled.value) {
    item.syncControlledAnswerSelection(answerId, filled.value)
  }
}, { immediate: true })

watch(item.resetVersion, () => {
  if (!controlled.value) {
    uncontrolledValue.value = String(props.defaultValue ?? "")
  }
})

watch([value, inputElement], () => {
  if (!inputElement.value) {
    return
  }

  // A native form reset restores `defaultValue`, so keep it in sync with the
  // value the questionnaire owns.
  inputElement.value.defaultValue = String(
    (controlled.value ? props.modelValue : props.defaultValue) ?? "",
  )
}, { flush: "post" })

onBeforeUnmount(() => {
  unregisterControl?.()
  unregisterControl = null
  unregisterSelection()
})
</script>

<template>
  <div
    data-slot="questionnaire-input-wrapper"
    class="w-full group/questionnaire-input relative min-w-0"
  >
    <input
      v-bind="$attrs"
      :id="answerId"
      ref="inputElement"
      data-slot="questionnaire-input"
      :aria-invalid="item.invalid.value || undefined"
      :aria-keyshortcuts="getAnswerKeyShortcuts(null, !disabled && filled && selected)"
      :data-disabled="disabled ? '' : undefined"
      :data-empty="filled ? undefined : ''"
      :data-filled="filled ? '' : undefined"
      :data-invalid="item.invalid.value ? '' : undefined"
      :disabled="disabled"
      :form="selected ? undefined : ''"
      :name="selected ? item.name.value : undefined"
      :type="props.type"
      :value="value"
      :class="cn(
        'dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs focus-visible:ring-3 aria-invalid:ring-3 md:text-sm min-h-11 w-full min-w-0 transition-[color,box-shadow,background-color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0',
        'selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground',
        props.class,
      )"
      @input="handleInput"
    >
  </div>
</template>
