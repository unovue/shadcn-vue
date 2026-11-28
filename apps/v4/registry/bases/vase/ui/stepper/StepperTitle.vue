<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import { cn } from "cn"
import { injectStepperItemContext } from "."

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes["class"]
}>(), {
  as: "h4",
})

const item = injectStepperItemContext()
</script>

<template>
  <component
    :is="as"
    :id="item.titleId"
    data-slot="stepper-title"
    :class="cn('text-md font-semibold whitespace-nowrap', props.class)"
  >
    <slot />
  </component>
</template>
