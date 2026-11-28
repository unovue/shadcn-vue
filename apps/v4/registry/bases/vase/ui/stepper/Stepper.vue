<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import { cn } from "cn"
import { computed, onMounted, reactive, ref, toRef, watch } from "vue"
import { provideStepperRootContext } from "."

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes["class"]
  defaultValue?: number
  modelValue?: number
  orientation?: "horizontal" | "vertical"
  dir?: "ltr" | "rtl"
  linear?: boolean
}>(), {
  as: "div",
  defaultValue: 1,
  orientation: "horizontal",
  dir: "ltr",
  linear: true,
})

const emits = defineEmits<{
  "update:modelValue": [value: number]
}>()

// The step changes at once, so more than one change in a tick all count.
const localValue = ref(props.modelValue ?? props.defaultValue)
const modelValue = computed<number>({
  get: () => localValue.value,
  set: (value) => {
    localValue.value = value
    emits("update:modelValue", value)
  },
})

watch(() => props.modelValue, (value) => {
  if (value !== undefined) {
    localValue.value = value
  }
})

const mounted = ref(false)
const items = reactive(new Map<number, { disabled: boolean }>())
const triggers = new Set<HTMLElement>()

const totalSteps = computed(() => items.size)
const isFirstStep = computed(() => modelValue.value === 1)
const isLastStep = computed(() => modelValue.value === totalSteps.value)
const isNextDisabled = computed(() => items.get(modelValue.value + 1)?.disabled ?? true)
const isPrevDisabled = computed(() => items.get(modelValue.value - 1)?.disabled ?? true)

function goToStep(step: number) {
  if (step > totalSteps.value || step < 1) {
    return
  }

  if (items.get(step)?.disabled) {
    return
  }

  if (props.linear && step > modelValue.value + 1) {
    return
  }

  modelValue.value = step
}

function nextStep() {
  goToStep(modelValue.value + 1)
}

function prevStep() {
  goToStep(modelValue.value - 1)
}

function hasNext() {
  return modelValue.value < totalSteps.value
}

function hasPrev() {
  return modelValue.value > 1
}

onMounted(() => {
  mounted.value = true
})

provideStepperRootContext({
  modelValue,
  changeModelValue: (value) => {
    modelValue.value = value
  },
  orientation: toRef(props, "orientation"),
  dir: toRef(props, "dir"),
  linear: toRef(props, "linear"),
  items,
  triggers,
})

defineExpose({
  goToStep,
  nextStep,
  prevStep,
  modelValue,
  totalSteps,
  isNextDisabled,
  isPrevDisabled,
  isFirstStep,
  isLastStep,
  hasNext,
  hasPrev,
})
</script>

<template>
  <component
    :is="as"
    role="group"
    aria-label="progress"
    data-slot="stepper"
    :data-linear="linear ? '' : undefined"
    :data-orientation="orientation"
    :class="cn(
      'flex gap-2',
      props.class,
    )"
  >
    <slot
      :model-value="modelValue"
      :total-steps="totalSteps"
      :is-next-disabled="isNextDisabled"
      :is-prev-disabled="isPrevDisabled"
      :is-first-step="isFirstStep"
      :is-last-step="isLastStep"
      :go-to-step="goToStep"
      :next-step="nextStep"
      :prev-step="prevStep"
      :has-next="hasNext"
      :has-prev="hasPrev"
    />
    <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {{ mounted ? `Step ${modelValue} of ${totalSteps}` : "" }}
    </div>
  </component>
</template>
