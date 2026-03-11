<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { DropzoneContextKey } from "./useDropzoneUpload"

const props = defineProps<{
  class?: string
}>()

const context = inject(DropzoneContextKey)

if (!context) {
  throw new Error("DropzoneMessage must be used within a Dropzone")
}
</script>

<template>
  <p
    :id="context.rootMessageId"
    :class="cn('h-5 text-[0.8rem] font-medium text-destructive', props.class)"
  >
    <template v-if="context.rootError.value">
      {{ context.rootError.value }}
    </template>
    <slot v-else />
  </p>
</template>
