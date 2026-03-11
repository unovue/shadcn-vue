<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import { DropzoneFileListItemContextKey } from "./useDropzoneUpload"

const props = withDefaults(defineProps<{
  class?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"
}>(), {
  variant: "default",
  size: "icon",
})

const context = inject(DropzoneFileListItemContextKey)

if (!context) {
  throw new Error("DropzoneRemoveFile must be used within a DropzoneFileListItem")
}
</script>

<template>
  <Button
    :variant="variant"
    :size="size"
    type="button"
    :class="cn('aria-disabled:pointer-events-none aria-disabled:opacity-50', props.class)"
    @click="context.onRemoveFile"
  >
    <slot />
    <span class="sr-only">Remove file</span>
  </Button>
</template>
