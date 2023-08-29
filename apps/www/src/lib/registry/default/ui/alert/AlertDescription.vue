<script setup lang="ts">
import { cn } from '@/utils';
import { computed, useAttrs } from 'vue';

defineOptions({
  name: 'AlertDescription',
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
  <div v-bind="attrs" :class="cn('text-sm [&_p]:leading-relaxed', attrs.className ?? '')">
    <slot />
  </div>
</template>
