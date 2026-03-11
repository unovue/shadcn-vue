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
  throw new Error("DropzoneRetryFile must be used within a DropzoneFileListItem")
}
</script>

<template>
  <Button
    :variant="variant"
    :size="size"
    type="button"
    :disabled="!context.canRetry.value"
    :aria-disabled="!context.canRetry.value"
    aria-label="retry"
    :class="cn(props.class)"
    @click="context.canRetry.value ? context.onRetry() : undefined"
  >
    <slot />
    <span class="sr-only">Retry</span>
  </Button>
</template>
