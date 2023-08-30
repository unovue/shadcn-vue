<script setup lang="ts">
import {
  NavigationMenuTrigger,
  type NavigationMenuTriggerProps,
} from 'radix-vue'
import { cva } from 'class-variance-authority'
import { ChevronDown } from 'lucide-vue-next'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuTriggerProps & { class?: string }>()

const navigationMenuTriggerStyle = computed(() => {
  return cva(
    'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-outline-hover hover:text-foreground focus:bg-outline-hover focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-outline-hover data-[state=open]:bg-outline-hover',
  )
})
</script>

<template>
  <NavigationMenuTrigger
    :class="cn(navigationMenuTriggerStyle(), props.class)"
    v-bind="props"
  >
    <slot />
    {{ " " }}
    <ChevronDown
      class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuTrigger>
</template>
