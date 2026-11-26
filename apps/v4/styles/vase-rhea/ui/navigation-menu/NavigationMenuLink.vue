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
    :class="cn('data-[active=true]:focus:bg-muted data-[active=true]:hover:bg-muted data-[active=true]:bg-muted/50 focus-visible:ring-ring/30 hover:bg-muted focus:bg-muted flex items-center gap-2 rounded-2xl px-2.5 py-1.5 text-sm transition-all outline-none focus-visible:ring-3 focus-visible:outline-1 [&_svg:not([class*=size-])]:size-4 in-data-[slot=navigation-menu-content]:rounded-xl font-medium in-data-[slot=navigation-menu-content]:font-normal in-data-[slot=navigation-menu-content]:p-2 in-data-[slot=navigation-menu-content]:w-full', props.class)"
  >
    <slot />
  </NavigationMenu.Link>
</template>
