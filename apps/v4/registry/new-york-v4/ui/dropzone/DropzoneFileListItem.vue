<script setup lang="ts">
import type { FileStatus } from "./useDropzoneUpload"
import { computed, inject, provide } from "vue"
import { cn } from "@/lib/utils"
import { DropzoneContextKey, DropzoneFileListItemContextKey } from "./useDropzoneUpload"

const props = defineProps<{
  file: FileStatus<unknown, unknown>
  class?: string
}>()

const context = inject(DropzoneContextKey)

if (!context) {
  throw new Error("DropzoneFileListItem must be used within a Dropzone")
}

const fileStatus = computed(() => props.file)
const messageId = context.getFileMessageId(props.file.id)
const isInvalid = computed(() => props.file.status === "error")
const canRetryComputed = computed(() => context.canRetry(props.file.id))

async function onRemoveFile() {
  await context!.onRemoveFile(props.file.id)
}

async function onRetry() {
  await context!.onRetry(props.file.id)
}

provide(DropzoneFileListItemContextKey, {
  onRemoveFile,
  onRetry,
  fileStatus,
  canRetry: canRetryComputed,
  dropzoneId: context.inputId,
  messageId,
})
</script>

<template>
  <li
    aria-label="dropzone-file-list-item"
    :aria-describedby="isInvalid ? messageId : undefined"
    :class="cn(
      'flex flex-col justify-center gap-2 rounded-md bg-muted/40 px-4 py-2',
      props.class,
    )"
  >
    <slot />
  </li>
</template>
