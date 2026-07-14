<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { AttachmentVariants } from "."
import { cn } from "@/lib/utils"
import { attachmentVariants } from "."

interface Props {
  size?: AttachmentVariants["size"]
  orientation?: AttachmentVariants["orientation"]
  state?: "idle" | "uploading" | "processing" | "error" | "done"
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  state: "done",
  size: "default",
  orientation: "horizontal",
})
</script>

<template>
  <div
    data-slot="attachment"
    :data-state="state"
    :data-size="size"
    :data-orientation="orientation"
    :class="cn(attachmentVariants({ size, orientation }), props.class)"
  >
    <slot />
  </div>
</template>
