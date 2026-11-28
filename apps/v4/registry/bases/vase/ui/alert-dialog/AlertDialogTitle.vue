<script setup lang="ts">
import type { AlertDialogTitleProps } from "@vase-ui/vue/alert-dialog"
import type { HTMLAttributes } from "vue"
import { AlertDialog } from "@vase-ui/vue/alert-dialog"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ AlertDialogTitleProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <AlertDialog.Title
    data-slot="alert-dialog-title"
    :class="cn('cn-alert-dialog-title cn-font-heading', props.class)"
  >
    <slot />
  </AlertDialog.Title>
</template>
