<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import type { BadgeVariants } from "."
import { cn } from "cn"
import { badgeVariants } from "."

const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
  variant?: BadgeVariants["variant"]
  class?: HTMLAttributes["class"]
}>(), {
  as: "span",
})
</script>

<template>
  <component
    :is="as"
    data-slot="badge"
    :data-variant="variant"
    :class="cn(badgeVariants({ variant }), props.class)"
  >
    <slot />
  </component>
</template>
