<script setup lang="ts">
import type { AlertDialogRootEmits, AlertDialogRootProps } from "@vase-ui/vue/alert-dialog"
import { AlertDialog } from "@vase-ui/vue/alert-dialog"

interface Props extends /* @vue-ignore */ AlertDialogRootProps {}
interface Emits extends /* @vue-ignore */ AlertDialogRootEmits {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <AlertDialog.Root v-slot="slotProps">
    <slot v-bind="slotProps" />
  </AlertDialog.Root>
</template>
