<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  NavigationMenuTrigger,
  type NavigationMenuTriggerProps,
} from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'
import { navigationMenuTriggerStyle } from '.'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <NavigationMenuTrigger
    v-bind="delegatedProps"
    :class="cn(navigationMenuTriggerStyle(), 'group', props.class)"
  >
    <slot />
    <ChevronDown
      class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuTrigger>
</template>
