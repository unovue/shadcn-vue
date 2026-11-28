<script setup lang="ts">
import type { MenuGroupLabelProps } from '@vase-ui/vue/menu'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@vase-ui/vue/menu'
import { cn } from 'cn'
import { inject } from 'vue'
import { dropdownMenuGroupKey } from './DropdownMenuGroup.vue'

interface Props extends /* @vue-ignore */ MenuGroupLabelProps {
  class?: HTMLAttributes['class']
  inset?: boolean
}

const props = defineProps<Props>()

const inGroup = inject(dropdownMenuGroupKey, false)
</script>

<template>
  <Menu.GroupLabel
    v-if="inGroup"
    data-slot="dropdown-menu-label"
    :data-inset="inset ? '' : undefined"
    :class="cn('text-muted-foreground px-2 py-2 text-xs data-inset:pl-7', props.class)"
  >
    <slot />
  </Menu.GroupLabel>
  <div
    v-else
    data-slot="dropdown-menu-label"
    :data-inset="inset ? '' : undefined"
    :class="cn('text-muted-foreground px-2 py-2 text-xs data-inset:pl-7', props.class)"
  >
    <slot />
  </div>
</template>
