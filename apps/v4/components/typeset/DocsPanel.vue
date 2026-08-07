<script setup lang="ts">
import { Button } from '@/styles/reka-nova/ui/button'
</script>

<template>
  <div class="hidden w-88 flex-col items-start gap-3 xl:flex 2xl:w-104">
    <div class="isolate flex max-h-[calc(100vh-16rem)] w-full flex-col overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/10">
      <TypesetDocsContent />
    </div>
    <Button variant="link" size="sm" as-child class="text-muted-foreground">
      <NuxtLink to="/docs/typeset">
        Read the docs
      </NuxtLink>
    </Button>
  </div>
</template>
