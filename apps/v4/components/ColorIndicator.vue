<script setup lang="ts">
const props = defineProps<{ color: string }>()
</script>

<template>
  <span
    class="border-border/50 inline-block size-3 border"
    :style="{
      backgroundColor: color,
    }"
  />
</template>
