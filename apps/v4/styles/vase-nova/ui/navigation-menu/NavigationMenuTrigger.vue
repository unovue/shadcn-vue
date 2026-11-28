<script setup lang="ts">
import type { NavigationMenuTriggerProps } from '@vase-ui/vue/navigation-menu'

import type { HTMLAttributes } from 'vue'
import { ChevronDownIcon } from '@lucide/vue'
import { NavigationMenu } from '@vase-ui/vue/navigation-menu'
import { cn } from 'cn'
import { navigationMenuTriggerStyle } from '.'

interface Props extends /* @vue-ignore */ NavigationMenuTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <NavigationMenu.Trigger>
    <template #element="{ props: triggerProps, elementRef, state }">
      <button
        v-bind="triggerProps"
        :ref="elementRef"
        data-slot="navigation-menu-trigger"
        :data-popup-open="state.open ? '' : undefined"
        :class="cn(navigationMenuTriggerStyle(), 'group', props.class)"
      >
        <slot />
        <ChevronDownIcon class="relative top-px ml-1 size-3 transition duration-300 group-data-open/navigation-menu-trigger:rotate-180 group-data-popup-open/navigation-menu-trigger:rotate-180" aria-hidden="true" />
      </button>
    </template>
  </NavigationMenu.Trigger>
</template>
