<script setup lang="ts">
import type { ToastProviderProps } from "reka-ui"
import { ToastProvider } from "reka-ui"

const props = defineProps<ToastProviderProps>()
</script>

<template>
  <ToastProvider v-bind="props">
    <slot />
  </ToastProvider>
</template>
