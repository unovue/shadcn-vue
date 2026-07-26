<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <p :class="cn('max-w-2xl text-lg font-light text-foreground', $attrs.class ?? '')">
    <slot />
  </p>
</template>
