<script setup lang="ts">
import { Progress } from '@/registry/new-york-v4/ui/progress'

const progress = ref(13)

onMounted(() => {
  const timer = setTimeout(() => progress.value = 66, 500)
  onUnmounted(() => clearTimeout(timer))
})
</script>

<template>
  <Progress :model-value="progress" class="w-[60%]" />
</template>
