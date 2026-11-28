<script setup lang="ts">
import type { NavigationMenuListProps } from '@vase-ui/vue/navigation-menu'
import type { HTMLAttributes } from 'vue'
import { NavigationMenu } from '@vase-ui/vue/navigation-menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ NavigationMenuListProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <NavigationMenu.List
    data-slot="navigation-menu-list"
    :class="
      cn(
        'gap-0 group flex flex-1 list-none items-center justify-center',
        props.class,
      )
    "
  >
    <slot />
  </NavigationMenu.List>
</template>
