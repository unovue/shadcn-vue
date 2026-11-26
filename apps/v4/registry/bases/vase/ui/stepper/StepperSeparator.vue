<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import { cn } from "cn"
import { injectStepperItemContext, injectStepperRootContext } from "."

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes["class"]
}>(), {
  as: "div",
})

const root = injectStepperRootContext()
const item = injectStepperItemContext()
</script>

<template>
  <component
    :is="as"
    data-slot="stepper-separator"
    role="none"
    :data-orientation="root.orientation.value"
    :data-state="item.state.value"
    :class="cn(
      'bg-muted',
      // Disabled
      'group-data-[disabled]:bg-muted group-data-[disabled]:opacity-50',
      // Completed
      'group-data-[state=completed]:bg-accent',
      props.class,
    )"
  >
    <slot />
  </component>
</template>
