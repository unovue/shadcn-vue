<script setup lang="ts">
import { type AlertDialogEmits, type AlertDialogProps, AlertDialogRoot, useEmitAsProps } from 'radix-vue'

const props = defineProps<AlertDialogProps>()
const emits = defineEmits<AlertDialogEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <AlertDialogRoot v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </AlertDialogRoot>
</template>
