<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <section
    :class="cn(
      'flex w-full items-center justify-center space-x-4 py-4 md:pb-10',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </section>
</template>
