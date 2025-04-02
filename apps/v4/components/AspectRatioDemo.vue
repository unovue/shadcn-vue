<script setup lang="ts">
import { AspectRatio } from '@/registry/new-york-v4/ui/aspect-ratio'
</script>

<template>
  <div class="grid w-full max-w-sm items-start gap-4">
    <AspectRatio :ratio="16 / 9" class="bg-muted rounded-lg">
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        class="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
      >
    </AspectRatio>
    <AspectRatio :ratio="1 / 1" class="bg-muted rounded-lg">
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        class="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
      >
    </AspectRatio>
  </div>
</template>
