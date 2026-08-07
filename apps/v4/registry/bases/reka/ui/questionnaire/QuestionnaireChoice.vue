<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, onBeforeUnmount, ref, useId, watch } from "vue"
import { cn } from "@/lib/utils"
import IconPlaceholder from "@/registry/bases/reka/components/icon-placeholder/IconPlaceholder.vue"
import { getAnswerKeyShortcuts, injectQuestionnaireItemContext } from "./useQuestionnaire"

const props = withDefaults(defineProps<{
  /** Controlled checked state. Use with `v-model:checked`. */
  checked?: boolean
  class?: HTMLAttributes["class"]
  /** Checks the choice on mount and after a native form reset. */
  defaultChecked?: boolean
  disabled?: boolean
  /** Submitted as the answer of the parent item. */
  value: string
}>(), {
  // `undefined` keeps the choice uncontrolled. Without this default, Vue casts
  // the absent boolean prop to `false` and every choice looks controlled.
  checked: undefined,
  defaultChecked: false,
  disabled: false,
})

const emits = defineEmits<{
  "change": [event: Event]
  "update:checked": [checked: boolean]
}>()

const item = injectQuestionnaireItemContext()

const answerId = useId()
const inputElement = ref<HTMLInputElement | null>(null)
const initialDefaultChecked = props.defaultChecked

const controlled = computed(() => props.checked !== undefined)
const disabled = computed(() => item.disabled.value || props.disabled)
const selected = computed(() => item.selectedAnswerIds.value.includes(answerId))
const checked = computed(() => {
  if (!controlled.value) {
    return selected.value
  }

  // A skipped item clears every answer, including controlled ones.
  return item.status.value === "skipped" ? false : props.checked!
})
const type = computed(() => (item.multiple.value ? "checkbox" : "radio"))
const shortcut = computed(() =>
  item.shortcutByChoiceValue.value?.get(props.value)
  ?? item.shortcutByAnswerId.value.get(answerId)
  ?? null)

function syncCheckedElement() {
  if (inputElement.value && inputElement.value.checked !== checked.value) {
    inputElement.value.checked = checked.value
  }
}

function handleChange(event: Event) {
  emits("change", event)

  if (event.defaultPrevented) {
    syncCheckedElement()
    return
  }

  const nextChecked = (event.target as HTMLInputElement).checked

  emits("update:checked", nextChecked)

  if (!controlled.value) {
    item.setAnswerSelectionFromInteraction(answerId, nextChecked)
    return
  }

  // Re-selecting the same controlled choice has to clear the skipped state.
  if (item.status.value === "skipped" && props.checked === nextChecked) {
    item.setAnswerSelectionFromInteraction(answerId, props.checked)
  }

  // Checking a radio clears its siblings, so the whole group has to re-sync in
  // case the host keeps the previous answer.
  item.requestControlSync()
}

const unregisterSelection = item.registerAnswerSelection(answerId, initialDefaultChecked)

let unregisterControl: (() => void) | null = null

watch([inputElement, disabled, () => props.disabled, () => props.value], ([element]) => {
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
    type: "choice",
    value: props.value,
  })
}, { flush: "post" })

watch(() => props.defaultChecked, (defaultChecked) => {
  item.setAnswerDefault(answerId, defaultChecked)
})

watch([() => props.checked, item.resetVersion], () => {
  if (controlled.value) {
    item.syncControlledAnswerSelection(answerId, props.checked!)
  }
}, { immediate: true })

watch(item.controlSyncVersion, syncCheckedElement, { flush: "post" })

watch([checked, inputElement, () => props.defaultChecked, item.resetVersion], () => {
  if (!inputElement.value) {
    return
  }

  // Keep the native reset target aligned with the questionnaire owned default,
  // including controlled choices whose `checked` prop stays authoritative.
  inputElement.value.defaultChecked = controlled.value ? props.checked! : props.defaultChecked

  syncCheckedElement()
}, { flush: "post" })

onBeforeUnmount(() => {
  unregisterControl?.()
  unregisterControl = null
  unregisterSelection()
})
</script>

<template>
  <label
    data-slot="questionnaire-choice"
    :data-checked="checked ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="item.invalid.value ? '' : undefined"
    :data-shortcut="shortcut ?? undefined"
    :data-type="type"
    :data-unchecked="checked ? undefined : ''"
    :class="cn(
      'cn-questionnaire-choice group/questionnaire-choice relative flex min-h-11 cursor-pointer items-start text-start transition-colors outline-none select-none',
      'data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50',
      props.class,
    )"
  >
    <input
      :id="answerId"
      ref="inputElement"
      data-slot="questionnaire-choice-input"
      class="cn-questionnaire-choice-input absolute inset-0 z-10 size-full cursor-pointer opacity-0"
      :aria-invalid="item.invalid.value || undefined"
      :aria-keyshortcuts="getAnswerKeyShortcuts(shortcut, !disabled && checked)"
      :checked="checked"
      :data-checked="checked ? '' : undefined"
      :data-unchecked="checked ? undefined : ''"
      :disabled="disabled"
      :name="item.status.value === 'skipped' ? undefined : item.name.value"
      :required="item.required.value && !item.multiple.value && !item.hasInputAnswer.value"
      :type="type"
      :value="props.value"
      @change="handleChange"
    >
    <span
      aria-hidden="true"
      data-slot="questionnaire-choice-indicator"
      class="cn-questionnaire-choice-indicator pointer-events-none relative flex shrink-0 items-center justify-center border group-data-[type=radio]/questionnaire-choice:rounded-full"
    >
      <span
        data-slot="questionnaire-choice-indicator-dot"
        class="cn-questionnaire-choice-indicator-dot hidden rounded-full group-data-[type=checkbox]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
      />
      <IconPlaceholder
        data-slot="questionnaire-choice-indicator-check"
        class="cn-questionnaire-choice-indicator-check hidden group-data-[type=radio]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      />
    </span>
    <span
      data-slot="questionnaire-choice-label"
      class="cn-questionnaire-choice-label cn-questionnaire-choice-content flex min-w-0 flex-1 flex-col leading-snug"
    >
      <slot :checked="checked" :disabled="disabled" :shortcut="shortcut" :type="type" />
    </span>
    <span
      v-if="shortcut"
      aria-hidden="true"
      data-slot="questionnaire-choice-shortcut"
      class="cn-questionnaire-choice-shortcut cn-questionnaire-shortcut pointer-events-none ms-auto hidden shrink-0 group-data-[shortcut]/questionnaire-choice:inline-flex"
    >
      {{ shortcut }}
    </span>
  </label>
</template>
