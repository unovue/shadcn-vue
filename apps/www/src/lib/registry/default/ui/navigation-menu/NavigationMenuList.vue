<script setup lang="ts">
import { NavigationMenuList, type NavigationMenuListProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuListProps & { class?: string }>()
</script>

<template>
  <NavigationMenuList
    v-bind="props"
    :class="
      cn(
        'group flex flex-1 list-none items-center justify-center space-x-1',
        props.class,
      )
    "
  >
    <slot />
  </NavigationMenuList>
</template>
