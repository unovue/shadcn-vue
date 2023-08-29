<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { DropdownMenuSubTrigger as DropdownMenuSubTriggerPrimitive, type DropdownMenuSubTriggerProps } from 'radix-vue'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/utils'

defineOptions({
  name: 'DropdownMenuSubTrigger',
  inheritAttrs: false,
})

const props = defineProps<DropdownMenuSubTriggerProps & {
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
  <DropdownMenuSubTriggerPrimitive
    :class="cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      inset && 'pl-8',
      attrs.className ?? '',
    )"
    v-bind="{ ...attrs.rest, ...props }"
  >
    <slot />
    <ChevronRight class="ml-auto w-4 h-4" />
  </DropdownMenuSubTriggerPrimitive>
</template>
