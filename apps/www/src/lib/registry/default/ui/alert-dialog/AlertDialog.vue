<script setup lang="ts">
import { type AlertDialogProps, AlertDialogRoot } from 'radix-vue'

const props = defineProps<AlertDialogProps>()
</script>

<template>
  <AlertDialogRoot :default-open="props.defaultOpen" :open="props.open">
    <slot />
  </AlertDialogRoot>
</template>
