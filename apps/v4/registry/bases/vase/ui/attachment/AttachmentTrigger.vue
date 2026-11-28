<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import { cn } from "cn"

interface Props {
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes["class"]
}
const props = withDefaults(defineProps<Props>(), {
  as: "button",
})
</script>

<template>
  <component
    :is="as"
    data-slot="attachment-trigger"
    :class="cn('cn-attachment-trigger absolute inset-0 z-10 outline-none', props.class)"
  >
    <slot />
  </component>
</template>
