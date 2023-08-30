<script setup lang="ts">
import { MenubarTrigger, type MenubarTriggerProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<MenubarTriggerProps & { class?: string }>()
</script>

<template>
  <MenubarTrigger
    v-bind="props"
    :class="
      cn(
        'flex cursor-default select-none items-center rounded px-3 py-1.5 text-sm font-medium outline-none data-[highlighted]:bg-outline-hover focus:bg-outline-hover text-foreground',
        props.class,
      )
    "
  >
    <slot />
  </MenubarTrigger>
</template>
