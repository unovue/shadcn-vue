<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import type { ButtonGroupVariants } from "."
import { cn } from "cn"

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes["class"]
  orientation?: ButtonGroupVariants["orientation"]
}>(), {
  as: "div",
})
</script>

<template>
  <component
    :is="as"
    role="group"
    :data-orientation="props.orientation"
    :class="cn('cn-button-group-text flex items-center [&_svg]:pointer-events-none', props.class)"
  >
    <slot />
  </component>
</template>
