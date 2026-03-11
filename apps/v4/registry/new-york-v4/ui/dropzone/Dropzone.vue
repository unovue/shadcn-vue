<script setup lang="ts">
import type { UseDropzoneUploadReturn } from "./useDropzoneUpload"
import { provide } from "vue"
import { DropzoneContextKey } from "./useDropzoneUpload"

const props = defineProps<UseDropzoneUploadReturn<unknown, unknown>>()

provide(DropzoneContextKey, props)
</script>

<template>
  <slot />
</template>
