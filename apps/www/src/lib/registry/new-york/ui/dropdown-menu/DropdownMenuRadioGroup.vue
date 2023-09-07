<script setup lang="ts">
import {
  DropdownMenuRadioGroup,
  type DropdownMenuRadioGroupEmits,
  type DropdownMenuRadioGroupProps,
} from 'radix-vue'

const props = defineProps<DropdownMenuRadioGroupProps>()

const emits = defineEmits<DropdownMenuRadioGroupEmits>()
</script>

<template>
  <DropdownMenuRadioGroup
    v-bind="props"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <slot />
  </DropdownMenuRadioGroup>
</template>
