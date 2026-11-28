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
  <Menu.CheckboxItem>
    <template #element="{ props: itemProps, elementRef, state }">
      <div
        v-bind="itemProps"
        :ref="elementRef"
        data-slot="menubar-checkbox-item"
        :data-disabled="state.disabled ? '' : undefined"
        :class="cn(
          'focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-1.5 pl-7 text-sm data-inset:pl-7 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
          props.class,
        )"
      >
        <span
          class="left-1.5 size-4 [&_svg:not([class*=size-])]:size-4 pointer-events-none absolute flex items-center justify-center"
        >
          <template v-if="state.checked">
            <slot name="indicator-icon">
              <CheckIcon />
            </slot>
          </template>
        </span>
        <slot />
      </div>
    </template>
  </Menu.CheckboxItem>
</template>
