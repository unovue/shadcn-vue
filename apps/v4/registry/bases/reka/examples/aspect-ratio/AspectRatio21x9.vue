<script setup lang="ts">
import { AspectRatio } from "@/registry/bases/reka/ui/aspect-ratio"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="21:9" class="items-center justify-center">
    <AspectRatio :ratio="21 / 9" class="bg-muted rounded-lg">
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Photo"
        class="h-full w-full rounded-lg object-cover grayscale dark:brightness-20"
      >
    </AspectRatio>
  </Example>
</template>
