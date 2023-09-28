<script setup lang="ts">
import { DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps, useEmitAsProps } from 'radix-vue'

const props = defineProps<DropdownMenuRootProps>()
const emits = defineEmits<DropdownMenuRootEmits>()
</script>

<template>
  <DropdownMenuRoot v-bind="{ ...props, ...useEmitAsProps(emits) }">
    <slot />
  </DropdownMenuRoot>
</template>
