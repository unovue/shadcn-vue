<script setup lang="ts">
import { ArrowRightIcon } from '@lucide/vue'

import { Badge } from '@/registry/new-york-v4/ui/badge'
</script>

<template>
  <Badge as-child variant="secondary" class="bg-muted">
    <NuxtLink href="/docs/changelog">
      <span class="flex size-2 rounded-full bg-green-500" title="New" />
      New: Typeset, Questionnaire and more <ArrowRightIcon />
    </NuxtLink>
  </Badge>
</template>
