<script setup lang="ts">
import type { NavigationMenuItemProps } from '@vase-ui/vue/navigation-menu'
import type { HTMLAttributes } from 'vue'
import { NavigationMenu } from '@vase-ui/vue/navigation-menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ NavigationMenuItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <NavigationMenu.Item
    data-slot="navigation-menu-item"
    :class="cn('relative', props.class)"
  >
    <slot />
  </NavigationMenu.Item>
</template>
