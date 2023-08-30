<script setup lang="ts">
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'
import RadixIconsCheck from '~icons/radix-icons/check'

const props = defineProps<SelectItemProps & { class?: string }>()
</script>

<template>
  <div class="flex justify-between items-center">
    <SelectItem
      v-bind="props"
      :class="
        cn(
          'flex w-full relative cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-outline-hover focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          props.class,
        )
      "
    >
      <div class="h-4 absolute right-2 w-4 items-center justify-center">
        <SelectItemIndicator>
          <RadixIconsCheck />
        </SelectItemIndicator>
      </div>
      <slot />
    </SelectItem>
  </div>
</template>
