<script setup lang="ts">
import type { MenuSubmenuTriggerProps } from '@vase-ui/vue/menu'

import type { HTMLAttributes } from 'vue'
import { ChevronRightIcon } from '@lucide/vue'
import { Menu } from '@vase-ui/vue/menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ MenuSubmenuTriggerProps {
  class?: HTMLAttributes['class']
  inset?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <Menu.SubmenuTrigger>
    <template #element="{ props: triggerProps, elementRef, state }">
      <div
        v-bind="triggerProps"
        :ref="elementRef"
        data-slot="menubar-sub-trigger"
        :data-inset="inset ? '' : undefined"
        :data-disabled="state.disabled ? '' : undefined"
        :class="cn(
          'focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground gap-2 min-h-7 rounded-xl px-2 py-1.5 text-sm data-inset:pl-7 [&_svg:not([class*=size-])]:size-4 flex cursor-default items-center outline-none select-none data-popup-open:bg-accent data-popup-open:text-accent-foreground',
          props.class,
        )"
      >
        <slot />
        <ChevronRightIcon class="cn-rtl-flip ml-auto size-4" />
      </div>
    </template>
  </Menu.SubmenuTrigger>
</template>
