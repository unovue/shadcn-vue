<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/registry/new-york-v4/ui/button'

const key = ref(0)
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <p
      :key="key"
      class="shimmer text-sm text-muted-foreground shimmer-duration-1100 shimmer-once"
    >
      Generating response&hellip;
    </p>
    <Button
      variant="outline"
      size="sm"
      @click="key++"
    >
      Replay
    </Button>
  </div>
</template>
