<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import type { MarkerVariants } from "."
import { cn } from "cn"
import { markerVariants } from "."

interface Props {
  as?: keyof HTMLElementTagNameMap | Component
  variant?: MarkerVariants["variant"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
})
</script>

<template>
  <component
    :is="as"
    data-slot="marker"
    :data-variant="variant"
    :class="cn(markerVariants({ variant }), props.class)"
  >
    <slot />
  </component>
</template>
