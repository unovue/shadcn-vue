<script setup lang="ts">
import { type AlertDialogEmits, type AlertDialogProps, AlertDialogRoot } from 'radix-vue'
import { useEmitAsProps } from '@/lib/utils'

const props = defineProps<AlertDialogProps>()

const emits = defineEmits<AlertDialogEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <AlertDialogRoot v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </AlertDialogRoot>
</template>
