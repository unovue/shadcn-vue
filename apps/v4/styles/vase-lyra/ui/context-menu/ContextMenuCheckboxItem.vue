<script setup lang="ts">
import type { ContextMenuCheckboxItemEmits, ContextMenuCheckboxItemProps } from '@vase-ui/vue/context-menu'

import type { HTMLAttributes } from 'vue'
import { CheckIcon } from '@lucide/vue'
import { ContextMenu } from '@vase-ui/vue/context-menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ ContextMenuCheckboxItemProps {
  class?: HTMLAttributes['class']
}
interface Emits extends /* @vue-ignore */ ContextMenuCheckboxItemEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <ContextMenu.CheckboxItem
    v-slot="{ state }"
    data-slot="context-menu-checkbox-item"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground gap-2 rounded-none py-2 pr-8 pl-2 text-xs data-inset:pl-7 [&_svg:not([class*=size-])]:size-4 relative flex cursor-default items-center outline-hidden select-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      props.class,
    )"
  >
    <span
      class="absolute right-2 pointer-events-none"
    >
      <template v-if="state.checked">
        <slot name="indicator-icon">
          <CheckIcon />
        </slot>
      </template>
    </span>
    <slot />
  </ContextMenu.CheckboxItem>
</template>
