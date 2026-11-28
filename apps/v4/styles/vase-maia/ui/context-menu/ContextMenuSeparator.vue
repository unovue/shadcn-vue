<script setup lang="ts">
import type { ContextMenuSeparatorProps } from '@vase-ui/vue/context-menu'
import type { HTMLAttributes } from 'vue'
import { ContextMenu } from '@vase-ui/vue/context-menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ ContextMenuSeparatorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <ContextMenu.Separator
    data-slot="context-menu-separator"
    :class="cn('bg-border/50 -mx-1 my-1 h-px', props.class)"
  />
</template>
