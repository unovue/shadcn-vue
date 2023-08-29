<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/utils'

defineOptions({
  name: 'AlertTitle',
  inheritAttrs: false,
})

const allAttrs = useAttrs()
const attrs = computed(() => {
  const { class: className, ...rest } = allAttrs
  return {
    className,
    rest,
  }
})
</script>

<template>
  <h5 :class="cn('mb-1 font-medium leading-none tracking-tight', attrs.className)" v-bind="attrs.rest">
    <slot />
  </h5>
</template>
