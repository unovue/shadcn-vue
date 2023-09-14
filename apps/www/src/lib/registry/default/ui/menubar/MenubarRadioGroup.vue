<script setup lang="ts">
import {
  MenubarRadioGroup,
  type MenubarRadioGroupEmits,
  type MenubarRadioGroupProps,
} from 'radix-vue'

const props = defineProps<MenubarRadioGroupProps>()

const emits = defineEmits<MenubarRadioGroupEmits>()
</script>

<template>
  <MenubarRadioGroup
    v-bind="props"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <slot />
  </MenubarRadioGroup>
</template>
