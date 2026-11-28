<script setup lang="ts">
import type { SelectValueProps } from "@vase-ui/vue/select"
import { Select } from "@vase-ui/vue/select"

interface Props extends /* @vue-ignore */ SelectValueProps {}

defineProps<Props>()
</script>

<template>
  <Select.Value data-slot="select-value">
    <template v-if="$slots.default" #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </Select.Value>
</template>
