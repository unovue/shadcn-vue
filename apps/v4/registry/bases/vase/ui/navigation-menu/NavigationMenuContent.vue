<script setup lang="ts">
import type { NavigationMenuContentProps } from "@vase-ui/vue/navigation-menu"
import type { HTMLAttributes } from "vue"
import { NavigationMenu } from "@vase-ui/vue/navigation-menu"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ NavigationMenuContentProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <NavigationMenu.Content
    data-slot="navigation-menu-content"
    :transition="{
      enterFromClass: 'opacity-0 data-[activation-direction=left]:-translate-x-1/2 data-[activation-direction=right]:translate-x-1/2',
      leaveToClass: 'opacity-0 data-[activation-direction=left]:translate-x-1/2 data-[activation-direction=right]:-translate-x-1/2',
    }"
    :class="cn(
      'cn-navigation-menu-content h-full w-auto transition-[opacity,transform,translate] duration-[0.35s] **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
      props.class,
    )"
  >
    <slot />
  </NavigationMenu.Content>
</template>
