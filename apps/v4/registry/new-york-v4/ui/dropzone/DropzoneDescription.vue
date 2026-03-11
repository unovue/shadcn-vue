<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { DropzoneContextKey } from "./useDropzoneUpload"

const props = defineProps<{
  class?: string
}>()

const context = inject(DropzoneContextKey)

if (!context) {
  throw new Error("DropzoneDescription must be used within a Dropzone")
}
</script>

<template>
  <p
    :id="context.rootDescriptionId"
    :class="cn('pb-1 text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </p>
</template>
