<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuItem, type NavigationMenuItemProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <NavigationMenuItem
    data-slot="navigation-menu-item"
    v-bind="delegatedProps"
    :class="cn('relative', props.class)"
  >
    <slot />
  </NavigationMenuItem>
</template>
