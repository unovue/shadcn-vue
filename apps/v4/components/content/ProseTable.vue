<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div class="my-6 w-full overflow-y-auto">
    <table
      :class="cn(
        'relative w-full overflow-hidden border-none text-sm',
        props.class,
      )"
      v-bind="$attrs"
    />
  </div>
</template>
