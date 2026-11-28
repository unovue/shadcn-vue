<script setup lang="ts">
import type { NavigationMenuLinkProps } from "@vase-ui/vue/navigation-menu"
import type { HTMLAttributes } from "vue"
import { NavigationMenu } from "@vase-ui/vue/navigation-menu"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ NavigationMenuLinkProps {
  class?: HTMLAttributes["class"]
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
    :class="cn('cn-navigation-menu-link', props.class)"
  >
    <slot />
  </NavigationMenu.Link>
</template>
