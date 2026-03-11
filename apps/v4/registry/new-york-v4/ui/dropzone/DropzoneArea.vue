<script setup lang="ts">
import { computed, inject } from "vue"
import { cn } from "@/lib/utils"
import { DropzoneContextKey } from "./useDropzoneUpload"

const props = defineProps<{
  class?: string
}>()

const context = inject(DropzoneContextKey)

if (!context) {
  throw new Error("DropzoneArea must be used within a Dropzone")
}

const rootProps = computed(() => context.getRootProps())
</script>

<template>
  <div
    v-bind="rootProps"
    :class="cn(
      'flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      context.isDragActive.value && 'animate-pulse bg-black/5',
      context.isInvalid.value && 'border-destructive',
      props.class,
    )"
    aria-label="dropzone"
  >
    <slot />
  </div>
</template>
