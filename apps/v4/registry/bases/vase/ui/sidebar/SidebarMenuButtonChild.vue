<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import type { SidebarMenuButtonVariants } from "."
import { cn } from "cn"
import { sidebarMenuButtonVariants } from "."

export interface SidebarMenuButtonProps {
  as?: keyof HTMLElementTagNameMap | Component
  variant?: SidebarMenuButtonVariants["variant"]
  size?: SidebarMenuButtonVariants["size"]
  isActive?: boolean
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
  as: "button",
  variant: "default",
  size: "default",
})
</script>

<template>
  <component
    :is="as"
    data-slot="sidebar-menu-button"
    data-sidebar="menu-button"
    :data-size="size"
    :data-active="isActive || undefined"
    :class="cn(sidebarMenuButtonVariants({ variant, size }), props.class)"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>
