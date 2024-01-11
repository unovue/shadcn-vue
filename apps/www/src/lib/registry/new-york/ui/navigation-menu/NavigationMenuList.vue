<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { NavigationMenuList, type NavigationMenuListProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <NavigationMenuList
    v-bind="delegatedProps"
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
