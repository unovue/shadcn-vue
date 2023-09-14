<script setup lang="ts">
import {
  MenubarSub,
  type MenubarSubEmits,
} from 'radix-vue'

interface MenubarSubRootProps {
  defaultOpen?: boolean
  open?: boolean
}

const props = defineProps<MenubarSubRootProps>()

const emits = defineEmits<MenubarSubEmits>()
</script>

<template>
  <MenubarSub v-bind="props" @update:open="emits('update:open', $event)">
    <slot />
  </MenubarSub>
</template>
