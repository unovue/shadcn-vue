<script setup lang="ts">
import type { ContextMenuGroupLabelProps } from '@vase-ui/vue/context-menu'
import type { HTMLAttributes } from 'vue'
import { ContextMenu } from '@vase-ui/vue/context-menu'
import { cn } from 'cn'
import { inject } from 'vue'
import { contextMenuGroupKey } from './ContextMenuGroup.vue'

interface Props extends /* @vue-ignore */ ContextMenuGroupLabelProps {
  class?: HTMLAttributes['class']
  inset?: boolean
}

const props = defineProps<Props>()

const inGroup = inject(contextMenuGroupKey, false)
</script>

<template>
  <ContextMenu.GroupLabel
    v-if="inGroup"
    data-slot="context-menu-label"
    :data-inset="inset ? '' : undefined"
    :class="cn('text-muted-foreground px-2 py-2 text-xs data-inset:pl-7', props.class)"
  >
    <slot />
  </ContextMenu.GroupLabel>
  <div
    v-else
    data-slot="context-menu-label"
    :data-inset="inset ? '' : undefined"
    :class="cn('text-muted-foreground px-2 py-2 text-xs data-inset:pl-7', props.class)"
  >
    <slot />
  </div>
</template>
