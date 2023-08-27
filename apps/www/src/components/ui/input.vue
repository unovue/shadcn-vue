<template>
  <input :type="type" :class="inputClass" v-bind="$attrs" />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const { type, className } = defineProps<{
  className?: string
  type?: HTMLAttributes['inputmode']
}>()

const inputClass = computed(() => [
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  className
])
</script>
