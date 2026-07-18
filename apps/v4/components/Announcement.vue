<script setup lang="ts">
import { ArrowRightIcon } from '@lucide/vue'

import { Badge } from '@/registry/new-york-v4/ui/badge'
</script>

<template>
  <Badge as-child variant="secondary" class="bg-muted">
    <NuxtLink href="/docs/components/message-scroller">
      Introducing Chat Components <ArrowRightIcon />
    </NuxtLink>
  </Badge>
</template>
