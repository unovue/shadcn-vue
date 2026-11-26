<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li data-slot="pagination-item" :class="props.class">
    <slot />
  </li>
</template>
