<script setup lang="ts">
import type { ContextMenuRadioGroupEmits, ContextMenuRadioGroupProps } from "@vase-ui/vue/context-menu"
import { ContextMenu } from "@vase-ui/vue/context-menu"

interface Props extends /* @vue-ignore */ ContextMenuRadioGroupProps {}
interface Emits extends /* @vue-ignore */ ContextMenuRadioGroupEmits {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <ContextMenu.RadioGroup data-slot="context-menu-radio-group">
    <slot />
  </ContextMenu.RadioGroup>
</template>
