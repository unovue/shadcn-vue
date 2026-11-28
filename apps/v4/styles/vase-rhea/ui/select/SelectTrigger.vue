<script setup lang="ts">
import type { SelectTriggerProps } from '@vase-ui/vue/select'

import type { HTMLAttributes } from 'vue'
import { ChevronDownIcon } from '@lucide/vue'
import { Select } from '@vase-ui/vue/select'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ SelectTriggerProps {
  class?: HTMLAttributes['class']
  size?: 'sm' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
})
</script>

<template>
  <Select.Trigger
    data-slot="select-trigger"
    :data-size="size"
    :class="cn(
      'bg-input/50 border-transparent data-placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-2xl border py-2 px-3 text-sm transition-[color,box-shadow] duration-200 focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-8 data-[size=sm]:h-7 *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*=size-])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <slot />
    <Select.Icon class="flex">
      <ChevronDownIcon class="text-muted-foreground size-4 pointer-events-none" />
    </Select.Icon>
  </Select.Trigger>
</template>
