<script setup lang="ts">
import type { MenuGroupLabelProps } from '@vase-ui/vue/menu'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@vase-ui/vue/menu'
import { cn } from 'cn'
import { inject } from 'vue'
import { menubarGroupKey } from './MenubarGroup.vue'

interface Props extends /* @vue-ignore */ MenuGroupLabelProps {
  class?: HTMLAttributes['class']
  inset?: boolean
}

const props = defineProps<Props>()

const inGroup = inject(menubarGroupKey, false)
</script>

<template>
  <Menu.GroupLabel
    v-if="inGroup"
    data-slot="menubar-label"
    :data-inset="inset ? '' : undefined"
    :class="cn('px-2 py-1.5 text-sm font-medium data-inset:pl-8', props.class)"
  >
    <slot />
  </Menu.GroupLabel>
  <div
    v-else
    data-slot="menubar-label"
    :data-inset="inset ? '' : undefined"
    :class="cn('px-2 py-1.5 text-sm font-medium data-inset:pl-8', props.class)"
  >
    <slot />
  </div>
</template>
