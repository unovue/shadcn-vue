<script setup lang="ts">
import { cn } from '@/utils';
import { computed, useAttrs } from 'vue';

defineOptions({
  name: 'AlertTitle',
  inheritAttrs: false,
})

const allAttrs = useAttrs()
const attrs = computed(() => {
  const { class: className, ...rest } = allAttrs
  return {
    className,
    rest: rest
  }
})
</script>

<template>
  <h5 :class="cn('mb-1 font-medium leading-none tracking-tight', attrs.className)" v-bind="attrs.rest">
    <slot />
  </h5>
</template>
