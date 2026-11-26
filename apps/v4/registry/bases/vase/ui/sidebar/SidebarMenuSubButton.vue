<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import { cn } from "cn"

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  size?: "sm" | "md"
  isActive?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  as: "a",
  size: "md",
})
</script>

<template>
  <component
    :is="as"
    data-slot="sidebar-menu-sub-button"
    data-sidebar="menu-sub-button"
    :data-size="size"
    :data-active="isActive || undefined"
    :class="cn(
      'cn-sidebar-menu-sub-button flex min-w-0 -translate-x-px items-center overflow-hidden outline-hidden group-data-[collapsible=icon]:hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:shrink-0',
      props.class,
    )"
  >
    <slot />
  </component>
</template>
