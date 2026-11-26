<script setup lang="ts">
import type { AlertDialogDescriptionProps } from "@vase-ui/vue/alert-dialog"
import type { HTMLAttributes } from "vue"
import { AlertDialog } from "@vase-ui/vue/alert-dialog"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ AlertDialogDescriptionProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <AlertDialog.Description
    data-slot="alert-dialog-description"
    :class="cn('cn-alert-dialog-description', props.class)"
  >
    <slot />
  </AlertDialog.Description>
</template>
