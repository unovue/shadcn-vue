<script setup lang="ts">
import {
  DropdownMenuSub,
  type DropdownMenuSubEmits,
  type DropdownMenuSubProps,
} from 'radix-vue'

const props = defineProps<DropdownMenuSubProps>()

const emits = defineEmits<DropdownMenuSubEmits>()
</script>

<template>
  <DropdownMenuSub v-bind="props" @update:open="emits('update:open', $event)">
    <slot />
  </DropdownMenuSub>
</template>
