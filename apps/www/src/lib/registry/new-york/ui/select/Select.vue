<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from 'radix-vue'
import { SelectRoot, useEmitAsProps } from 'radix-vue'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()
</script>

<template>
  <SelectRoot v-bind="{ ...props, ...useEmitAsProps(emits) }">
    <slot />
  </SelectRoot>
</template>
