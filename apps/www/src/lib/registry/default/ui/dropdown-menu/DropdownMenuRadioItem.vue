<script setup lang="ts">
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
  type DropdownMenuRadioItemEmits,
  type DropdownMenuRadioItemProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'
import RiCheckboxBlankCircleFill from '~icons/ri/checkbox-blank-circle-fill'

const props = defineProps<DropdownMenuRadioItemProps & { class?: string }>()

const emits = defineEmits<DropdownMenuRadioItemEmits>()
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="props"
    :class="[
      cn(
        'flex relative items-center rounded-md transition-colors data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:bg-outline-hover pl-7 py-1.5 text-sm outline-none select-none cursor-default',
        props.class,
      ),
    ]"
    @select="emits('select', $event)"
  >
    <DropdownMenuItemIndicator
      class="absolute left-2 inline-flex w-2 h-2 items-center justify-center"
    >
      <RiCheckboxBlankCircleFill class="text-foreground" />
    </DropdownMenuItemIndicator>
    <slot />
  </DropdownMenuRadioItem>
</template>
