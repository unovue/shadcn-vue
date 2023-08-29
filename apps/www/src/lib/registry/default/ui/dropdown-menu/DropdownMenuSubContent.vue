<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { type DropdownMenuSubContentEmits, DropdownMenuSubContent as DropdownMenuSubContentPrimitive, type DropdownMenuSubContentProps } from 'radix-vue'
import { cn, useEmitAsProps } from '@/utils'

defineOptions({
  name: 'DropdownMenuSubContent',
  inheritAttrs: false,
})
const props = defineProps<DropdownMenuSubContentProps>()
const emits = defineEmits<DropdownMenuSubContentEmits>()
const emitsAsProps = useEmitAsProps(emits)

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
  <DropdownMenuSubContentPrimitive
    :class="cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      attrs.className ?? '',
    )"
    v-bind="{ ...attrs.rest, ...props, ...emitsAsProps }"
  >
    <slot />
  </DropdownMenuSubContentPrimitive>
</template>
