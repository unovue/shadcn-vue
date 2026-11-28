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
    data-slot="sidebar-group-action"
    data-sidebar="group-action"
    :class="cn(
      'cn-sidebar-group-action flex aspect-square items-center justify-center outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 md:after:hidden [&>svg]:shrink-0',
      props.class,
    )"
  >
    <slot />
  </component>
</template>
