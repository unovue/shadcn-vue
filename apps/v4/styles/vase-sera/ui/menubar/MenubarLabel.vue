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
    :class="cn('px-3.5 py-2 text-xs uppercase tracking-wider data-inset:pl-9.5 font-semibold text-muted-foreground', props.class)"
  >
    <slot />
  </Menu.GroupLabel>
  <div
    v-else
    data-slot="menubar-label"
    :data-inset="inset ? '' : undefined"
    :class="cn('px-3.5 py-2 text-xs uppercase tracking-wider data-inset:pl-9.5 font-semibold text-muted-foreground', props.class)"
  >
    <slot />
  </div>
</template>
