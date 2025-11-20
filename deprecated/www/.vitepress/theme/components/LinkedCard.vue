<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <a :class="cn('flex w-full flex-col items-center rounded-lg border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10', $attrs.class ?? '')">
    <slot />
  </a>
</template>
