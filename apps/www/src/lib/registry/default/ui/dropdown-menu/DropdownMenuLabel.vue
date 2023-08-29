<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { DropdownMenuLabel as DropdownMenuLabelPrimitive, type DropdownMenuLabelProps } from 'radix-vue'
import { cn } from '@/utils'

defineOptions({
  name: 'DropdownMenuLabel',
  inheritAttrs: false,
})

const props = defineProps<DropdownMenuLabelProps & {
  inset?: boolean
}>()

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
  <DropdownMenuLabelPrimitive
    :class="cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      attrs.className ?? '',
    )"
    v-bind="{ ...attrs.rest, ...props }"
  >
    <slot />
  </DropdownMenuLabelPrimitive>
</template>
