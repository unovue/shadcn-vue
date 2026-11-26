<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import { cn } from "cn"
import { computed, onMounted, toRef, useId, watch } from "vue"
import { injectStepperRootContext, provideStepperItemContext } from "."

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes["class"]
  step: number
  disabled?: boolean
  completed?: boolean
}>(), {
  as: "div",
})

const root = injectStepperRootContext()

const step = toRef(props, "step")
const disabled = toRef(props, "disabled")

const state = computed(() => {
  if (props.completed || root.modelValue.value > props.step) {
    return "completed"
  }

  return root.modelValue.value === props.step ? "active" : "inactive"
})

const isFocusable = computed(() => {
  if (props.disabled) {
    return false
  }

  return root.linear.value
    ? props.step <= root.modelValue.value + 1
    : true
})

provideStepperItemContext({
  titleId: useId(),
  descriptionId: useId(),
  state,
  disabled,
  step,
  isFocusable,
})

// Items register after the mount, so the server and the first client render agree.
onMounted(() => {
  watch(() => [props.step, props.disabled] as const, ([registered, itemDisabled], _, onCleanup) => {
    root.items.set(registered, { disabled: itemDisabled })
    onCleanup(() => root.items.delete(registered))
  }, { immediate: true })
})
</script>

<template>
  <component
    :is="as"
    data-slot="stepper-item"
    :aria-current="state === 'active' ? 'true' : undefined"
    :data-state="state"
    :data-disabled="disabled || !isFocusable ? '' : undefined"
    :data-orientation="root.orientation.value"
    :class="cn('flex items-center gap-2 group data-[disabled]:pointer-events-none', props.class)"
  >
    <slot :state="state" />
  </component>
</template>
