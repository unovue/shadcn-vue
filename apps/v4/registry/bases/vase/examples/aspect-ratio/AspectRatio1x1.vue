<script setup lang="ts">
import { AspectRatio } from "@/registry/bases/vase/ui/aspect-ratio"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="1:1" class="items-start">
    <AspectRatio :ratio="1 / 1" class="bg-muted rounded-lg">
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Photo"
        class="h-full w-full rounded-lg object-cover grayscale dark:brightness-20"
      >
    </AspectRatio>
  </Example>
</template>
