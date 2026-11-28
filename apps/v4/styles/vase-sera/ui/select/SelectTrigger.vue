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
      'border-transparent border-b-input bg-transparent data-placeholder:text-muted-foreground focus-visible:border-b-ring aria-invalid:border-b-destructive dark:aria-invalid:border-b-destructive/50 gap-1.5 rounded-none border py-2 px-0 text-sm transition-[color,border-color] data-[size=default]:h-10 data-[size=sm]:h-9 *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*=size-])]:size-3.5 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <slot />
    <Select.Icon class="flex">
      <ChevronDownIcon class="text-muted-foreground size-3.5 pointer-events-none" />
    </Select.Icon>
  </Select.Trigger>
</template>
