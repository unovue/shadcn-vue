<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { DropzoneContextKey } from "./useDropzoneUpload"

const props = defineProps<{
  class?: string
}>()

const context = inject(DropzoneContextKey)

if (!context) {
  throw new Error("DropzoneFileList must be used within a Dropzone")
}
</script>

<template>
  <ol
    aria-label="dropzone-file-list"
    :class="cn('flex flex-col gap-4', props.class)"
  >
    <slot />
  </ol>
</template>
