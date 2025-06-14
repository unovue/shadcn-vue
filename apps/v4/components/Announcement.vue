<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'

import { Badge } from '@/registry/new-york-v4/ui/badge'
</script>

<template>
  <Badge as-child variant="secondary" class="rounded-full">
    <NuxtLink href="/docs/components/calendar">
      New Calendar Component <ArrowRightIcon />
    </NuxtLink>
  </Badge>
</template>
