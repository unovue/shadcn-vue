<script setup lang="ts">
import { Toaster } from '@/registry/new-york-v4/ui/sonner'
</script>

<template>
  <Body class="bg-background overscroll-none font-sans antialiased">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Toaster />
  </Body>
</template>
