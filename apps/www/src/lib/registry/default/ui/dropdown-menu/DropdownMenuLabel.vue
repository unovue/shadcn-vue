<script setup lang="ts">
import { DropdownMenuLabel, type DropdownMenuLabelProps } from 'radix-vue'

const props = defineProps<DropdownMenuLabelProps>()
</script>

<template>
  <div class="px-2 py-1.5 text-sm font-semibold">
    <DropdownMenuLabel v-bind="props">
      <slot />
    </DropdownMenuLabel>
  </div>
</template>
