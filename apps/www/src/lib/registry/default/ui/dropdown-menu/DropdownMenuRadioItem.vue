<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  DropdownMenuItemIndicator as DropdownMenuItemIndicatorPrimitive, type DropdownMenuRadioItemEmits, DropdownMenuRadioItem as DropdownMenuRadioItemPrimitive,
  type DropdownMenuRadioItemProps,
} from 'radix-vue'
import { CircleIcon } from 'lucide-vue-next'
import { cn, useEmitAsProps } from '@/utils'

defineOptions({
  name: 'DropdownMenuRadioItem',
  inheritAttrs: false,
})
const props = defineProps<DropdownMenuRadioItemProps>()
const emits = defineEmits<DropdownMenuRadioItemEmits>()
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
  <DropdownMenuRadioItemPrimitive
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      attrs.className ?? '',
    )"
    v-bind="{ ...attrs.rest, ...props, ...emitsAsProps }"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuItemIndicatorPrimitive>
        <CircleIcon class="h-4 w-4 fill-current" />
      </DropdownMenuItemIndicatorPrimitive>
    </span>
    <slot />
  </DropdownMenuRadioItemPrimitive>
</template>
