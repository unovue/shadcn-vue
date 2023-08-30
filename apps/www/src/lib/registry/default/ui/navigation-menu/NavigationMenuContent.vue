<script setup lang="ts">
import {
  NavigationMenuContent,
  type NavigationMenuContentEmits,
  type NavigationMenuContentProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuContentProps & { class?: string }>()

const emits = defineEmits<NavigationMenuContentEmits>()
</script>

<template>
  <NavigationMenuContent
    v-bind="props"
    :class="
      cn(
        'data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto',
        props.class,
      )
    "
  >
    <slot />
  </NavigationMenuContent>
</template>
