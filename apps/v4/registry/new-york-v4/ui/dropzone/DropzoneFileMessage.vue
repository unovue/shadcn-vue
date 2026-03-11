<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { DropzoneFileListItemContextKey } from "./useDropzoneUpload"

const props = defineProps<{
  class?: string
}>()

const context = inject(DropzoneFileListItemContextKey)

if (!context) {
  throw new Error("DropzoneFileMessage must be used within a DropzoneFileListItem")
}
</script>

<template>
  <p
    :id="context.messageId"
    :class="cn('h-5 text-[0.8rem] font-medium text-destructive', props.class)"
  >
    <template v-if="context.fileStatus.value.status === 'error'">
      {{ String(context.fileStatus.value.error) }}
    </template>
    <slot v-else />
  </p>
</template>
