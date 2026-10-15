<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="drawer-footer"
    :class="cn('gap-2 p-4 mt-auto flex flex-col', props.class)"
  >
    <slot />
  </div>
</template>
