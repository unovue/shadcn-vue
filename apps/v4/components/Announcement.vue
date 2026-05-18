<script setup lang="ts">
import { ArrowRightIcon } from '@lucide/vue'

import { Badge } from '@/registry/new-york-v4/ui/badge'
</script>

<template>
  <Badge as-child variant="secondary" class="bg-muted">
    <NuxtLink href="/create">
      Introducing Luma <ArrowRightIcon />
    </NuxtLink>
  </Badge>
</template>
