<script setup lang="ts">
import type { SelectItemTextProps } from '@vase-ui/vue/select'
import { Select } from '@vase-ui/vue/select'

interface Props extends /* @vue-ignore */ SelectItemTextProps {}

defineProps<Props>()
</script>

<template>
  <Select.ItemText data-slot="select-item-text">
    <slot />
  </Select.ItemText>
</template>
