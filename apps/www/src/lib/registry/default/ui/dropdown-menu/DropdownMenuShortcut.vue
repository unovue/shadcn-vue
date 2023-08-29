<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/utils'

defineOptions({
  name: 'DropdownMenuShortcut',
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
  <span
    :class="cn(
      'ml-auto text-xs tracking-widest opacity-60',
      attrs.className ?? '',
    )"
    v-bind="{ ...attrs.rest }"
  >
    <slot />
  </span>
</template>
