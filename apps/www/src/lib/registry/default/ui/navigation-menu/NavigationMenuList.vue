<script setup lang="ts">
import type { NavigationMenuListProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { NavigationMenuList, useForwardProps } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<NavigationMenuListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuList
    v-bind="forwardedProps"
    :class="
      cn(
        'group flex flex-1 list-none items-center justify-center gap-x-1',
        props.class,
      )
    "
  >
    <slot />
  </NavigationMenuList>
</template>
