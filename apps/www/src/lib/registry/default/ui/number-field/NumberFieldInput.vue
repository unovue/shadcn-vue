<script setup lang="ts">
import { NumberFieldInput } from 'radix-vue'
import { cn } from '@/lib/utils'
</script>

<template>
  <NumberFieldInput :class="cn('w-full bg-background text-sm text-center placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50')" />
</template>
