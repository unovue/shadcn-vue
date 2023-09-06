<script setup lang="ts">
import {
  ContextMenuRadioGroup,
  type ContextMenuRadioGroupEmits,
  type ContextMenuRadioGroupProps,
} from 'radix-vue'

const props = defineProps<ContextMenuRadioGroupProps>()

const emits = defineEmits<ContextMenuRadioGroupEmits>()
</script>

<template>
  <ContextMenuRadioGroup
    v-bind="props"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <slot />
  </ContextMenuRadioGroup>
</template>
