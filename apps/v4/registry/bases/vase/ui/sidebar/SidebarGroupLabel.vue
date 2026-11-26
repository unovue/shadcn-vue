<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import { cn } from "cn"

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  class?: HTMLAttributes["class"]
}>(), {
  as: "div",
})
</script>

<template>
  <component
    :is="as"
    data-slot="sidebar-group-label"
    data-sidebar="group-label"
    :class="cn(
      'cn-sidebar-group-label flex shrink-0 items-center outline-hidden [&>svg]:shrink-0',
      props.class)"
  >
    <slot />
  </component>
</template>
