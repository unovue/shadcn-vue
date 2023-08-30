<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps({
  class: String,
})
</script>

<template>
  <div :class="cn('w-full overflow-auto', props.class)">
    <table class="w-full caption-bottom">
      <slot />
    </table>
  </div>
</template>
