<script setup lang="ts">
import type { AlertDialogEmits, AlertDialogProps } from 'reka-ui'
import { AlertDialogRoot } from 'reka-ui'
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
