<script setup lang="ts">
import type { Component } from 'vue'

import { MinusIcon } from '@lucide/vue'

withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap | Component
}>(), {
  as: 'div',
})
</script>

<template>
  <component
    :is="as"
    data-slot="pin-input-separator"
  >
    <slot>
      <MinusIcon />
    </slot>
  </component>
</template>
