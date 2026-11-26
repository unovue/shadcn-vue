<script setup lang="ts">
import type { MenuCheckboxItemEmits, MenuCheckboxItemProps } from '@vase-ui/vue/menu'

import type { HTMLAttributes } from 'vue'
import { CheckIcon } from '@lucide/vue'
import { Menu } from '@vase-ui/vue/menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ MenuCheckboxItemProps {
  class?: HTMLAttributes['class']
}
interface Emits extends /* @vue-ignore */ MenuCheckboxItemEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Menu.CheckboxItem
    v-slot="{ state }"
    data-slot="dropdown-menu-checkbox-item"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2.5 rounded-2xl py-2 pr-8 pl-3 text-sm font-medium data-inset:pl-9.5 [&_svg:not([class*=size-])]:size-4 relative flex cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <span
      class="absolute right-2 flex items-center justify-center pointer-events-none"
      data-slot="dropdown-menu-checkbox-item-indicator"
    >
      <template v-if="state.checked">
        <slot name="indicator-icon">
          <CheckIcon />
        </slot>
      </template>
    </span>
    <slot />
  </Menu.CheckboxItem>
</template>
