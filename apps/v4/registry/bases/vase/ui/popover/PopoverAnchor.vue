<script setup lang="ts">
import type { Component } from "vue"
import { inject } from "vue"
import { popoverAnchorKey } from "./Popover.vue"

withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
}>(), {
  as: "div",
})

const anchor = inject(popoverAnchorKey, null)

function setAnchor(target: unknown) {
  if (!anchor)
    return
  anchor.value = target instanceof Element ? target : ((target as { $el?: Element } | null)?.$el ?? null)
}
</script>

<template>
  <component :is="as" :ref="setAnchor" data-slot="popover-anchor">
    <slot />
  </component>
</template>
