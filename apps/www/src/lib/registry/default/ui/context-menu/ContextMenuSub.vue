<script setup lang="ts">
import {
  ContextMenuSub,
  type ContextMenuSubEmits,
  type ContextMenuSubProps,
} from 'radix-vue'

const props = defineProps<ContextMenuSubProps>()

const emits = defineEmits<ContextMenuSubEmits>()
</script>

<template>
  <ContextMenuSub v-bind="props" @update:open="emits('update:open', $event)">
    <slot />
  </ContextMenuSub>
</template>
