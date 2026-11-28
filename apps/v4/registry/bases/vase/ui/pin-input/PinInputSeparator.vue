<script setup lang="ts">
import type { Component } from "vue"
import { IconPlaceholder } from "@/registry/bases/vase/components/icon-placeholder"

withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
}>(), {
  as: "div",
})
</script>

<template>
  <component
    :is="as"
    data-slot="pin-input-separator"
  >
    <slot>
      <IconPlaceholder lucide="MinusIcon" tabler="IconMinus" hugeicons="Minus01Icon" phosphor="MinusIcon" remixicon="RiSubtractLine" />
    </slot>
  </component>
</template>
