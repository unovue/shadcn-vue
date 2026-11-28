<script setup lang="ts">
import type { NavigationMenuIconProps } from '@vase-ui/vue/navigation-menu'
import type { HTMLAttributes } from 'vue'
import { NavigationMenu } from '@vase-ui/vue/navigation-menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ NavigationMenuIconProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <NavigationMenu.Icon
    data-slot="navigation-menu-indicator"
    :class="cn('data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-1 flex h-1.5 items-end justify-center overflow-hidden', props.class)"
  >
    <div class="bg-border rounded-tl-sm shadow-md relative top-[60%] h-2 w-2 rotate-45" />
  </NavigationMenu.Icon>
</template>
