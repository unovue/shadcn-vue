<script setup lang="ts">
import type { NavigationMenuLinkProps } from '@vase-ui/vue/navigation-menu'
import type { HTMLAttributes } from 'vue'
import { NavigationMenu } from '@vase-ui/vue/navigation-menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ NavigationMenuLinkProps {
  class?: HTMLAttributes['class']
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: undefined,
})
</script>

<template>
  <NavigationMenu.Link
    data-slot="navigation-menu-link"
    :data-active="active ? '' : undefined"
    :aria-current="active ? 'page' : undefined"
    :class="cn('data-active:focus:bg-muted data-active:hover:bg-muted data-active:bg-muted/50 focus-visible:ring-ring/50 hover:bg-muted focus:bg-muted flex items-center gap-2 rounded-none p-2 text-xs transition-all outline-none focus-visible:ring-1 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-none [&_svg:not([class*=size-])]:size-4', props.class)"
  >
    <slot />
  </NavigationMenu.Link>
</template>
