<script setup lang="ts">
import { NumberFieldInput } from 'radix-vue'
import { cn } from '@/lib/utils'
</script>

<template>
  <NumberFieldInput :class="cn('flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm text-center ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50')" />
</template>
