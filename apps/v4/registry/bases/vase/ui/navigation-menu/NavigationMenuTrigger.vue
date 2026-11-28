<script setup lang="ts">
import type { NavigationMenuTriggerProps } from "@vase-ui/vue/navigation-menu"
import type { HTMLAttributes } from "vue"
import { NavigationMenu } from "@vase-ui/vue/navigation-menu"
import { cn } from "cn"
import { IconPlaceholder } from "@/registry/bases/vase/components/icon-placeholder"
import { navigationMenuTriggerStyle } from "."

interface Props extends /* @vue-ignore */ NavigationMenuTriggerProps {
  class?: HTMLAttributes["class"]
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
        <IconPlaceholder
          lucide="ChevronDownIcon"
          tabler="IconChevronDown"
          hugeicons="ArrowDown01Icon"
          phosphor="CaretDownIcon"
          remixicon="RiArrowDownSLine"
          class="cn-navigation-menu-trigger-icon"
          aria-hidden="true"
        />
      </button>
    </template>
  </NavigationMenu.Trigger>
</template>
