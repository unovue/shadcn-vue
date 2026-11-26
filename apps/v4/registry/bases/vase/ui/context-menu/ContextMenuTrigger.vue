<script setup lang="ts">
import type { ContextMenuTriggerProps } from "@vase-ui/vue/context-menu"
import type { HTMLAttributes } from "vue"
import { ContextMenu } from "@vase-ui/vue/context-menu"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ ContextMenuTriggerProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <ContextMenu.Trigger
    data-slot="context-menu-trigger"
    :class="cn('cn-context-menu-trigger select-none', props.class)"
  >
    <slot />
  </ContextMenu.Trigger>
</template>
