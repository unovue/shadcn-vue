<script setup lang="ts">
import type { MenuItemProps } from '@vase-ui/vue/menu'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@vase-ui/vue/menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ MenuItemProps {
  class?: HTMLAttributes['class']
  inset?: boolean
  variant?: 'default' | 'destructive'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<template>
  <Menu.Item>
    <template #element="{ props: itemProps, elementRef, state }">
      <div
        v-bind="itemProps"
        :ref="elementRef"
        data-slot="menubar-item"
        :data-inset="inset ? '' : undefined"
        :data-variant="variant"
        :data-disabled="state.disabled ? '' : undefined"
        :class="cn(
          'focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2.5 rounded-xl px-3 py-2 text-sm data-disabled:opacity-50 data-inset:pl-9.5 [&_svg:not([class*=size-])]:size-4 group/menubar-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
          props.class,
        )"
      >
        <slot />
      </div>
    </template>
  </Menu.Item>
</template>
