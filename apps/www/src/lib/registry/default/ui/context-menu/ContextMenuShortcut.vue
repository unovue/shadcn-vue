<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <span :class="cn('ml-auto text-xs tracking-widest text-muted-foreground', $attrs.class ?? '')">
    <slot />
  </span>
</template>
