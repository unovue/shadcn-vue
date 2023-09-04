<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from 'radix-vue'
import { SelectRoot } from 'radix-vue'
import { useEmitAsProps } from '@/lib/utils'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()
</script>

<template>
  <SelectRoot v-bind="{ ...props, ...useEmitAsProps(emits) }">
    <slot />
  </SelectRoot>
</template>
