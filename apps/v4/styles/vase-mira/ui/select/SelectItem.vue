<script setup lang="ts">
import type { SelectItemProps } from '@vase-ui/vue/select'

import type { HTMLAttributes } from 'vue'
import { CheckIcon } from '@lucide/vue'
import { Select } from '@vase-ui/vue/select'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ SelectItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Select.Item
    v-slot="{ state }"
    data-slot="select-item"
    :class="
      cn(
        'focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground min-h-7 gap-2 rounded-md px-2 py-1 text-xs/relaxed [&_svg:not([class*=size-])]:size-3.5 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        props.class,
      )
    "
  >
    <span class="pointer-events-none absolute right-2 flex items-center justify-center">
      <template v-if="state.selected">
        <slot name="indicator-icon">
          <CheckIcon class="pointer-events-none" />
        </slot>
      </template>
    </span>

    <Select.ItemText>
      <slot />
    </Select.ItemText>
  </Select.Item>
</template>
