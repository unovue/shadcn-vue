<script setup lang="ts">
import { useEmitAsProps } from '@/lib/utils'
import { type AlertDialogEmits, type AlertDialogProps, AlertDialogRoot } from 'radix-vue'

const props = defineProps<AlertDialogProps>()

const emits = defineEmits<AlertDialogEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <AlertDialogRoot v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </AlertDialogRoot>
</template>
